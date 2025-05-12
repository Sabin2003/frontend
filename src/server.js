// // Required dependencies
// const express = require('express');
// const AWS = require('aws-sdk');
// const dotenv = require('dotenv');
// const cors = require('cors');

// // Load environment variables from .env file
// dotenv.config();

// // Initialize Express app
// const app = express();
// const router = express.Router();

// // Configure middleware
// app.use(express.json());
// app.use(cors());

// // Configure AWS
// AWS.config.update({
//   region: process.env.AWS_REGION || 'us-east-1',
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// // Setup DynamoDB
// const dynamoDB = new AWS.DynamoDB.DocumentClient();
// const TRANSLATIONS_TABLE = process.env.DYNAMODB_TABLE || 'Translations';

// // Setup SageMaker for model inference
// const sagemakerRuntime = new AWS.SageMakerRuntime();

// // Endpoint mapping for language pairs
// const ENDPOINT_MAPPING = {
//   'bafia': process.env.BAFIA_ENDPOINT || 'translation-bafia-endpoint',
//   'fulfulde': process.env.FULFULDE_ENDPOINT || 'translation-fulfulde-endpoint'
// };

// // API route for translation
// router.post('/translate', async (req, res) => {
//   try {
//     const { query, sourceLang, targetLang } = req.body;
    
//     // Validate required fields
//     if (!query || !sourceLang || !targetLang) {
//       return res.status(400).json({ 
//         error: 'Query, source language, and target language are required' 
//       });
//     }
    
//     // Log the incoming request
//     console.log(`Translation request: ${sourceLang} → ${targetLang}: "${query}"`);
    
//     // Normalize language inputs to lowercase
//     const normalizedSourceLang = sourceLang.toLowerCase();
//     const normalizedTargetLang = targetLang.toLowerCase();
    
//     // Check if this is a supported language pair
//     const supportedSourceLangs = ['english', 'french'];
//     const supportedTargetLangs = ['bafia', 'fulfulde'];
    
//     if (!supportedSourceLangs.includes(normalizedSourceLang)) {
//       return res.status(400).json({ 
//         error: `Unsupported source language: ${sourceLang}. Supported languages are: ${supportedSourceLangs.join(', ')}` 
//       });
//     }
    
//     if (!supportedTargetLangs.includes(normalizedTargetLang)) {
//       return res.status(400).json({ 
//         error: `Unsupported target language: ${targetLang}. Supported languages are: ${supportedTargetLangs.join(', ')}` 
//       });
//     }
    
//     // Step 1: Check if result exists in DynamoDB
//     const queryKey = `${query}#${normalizedSourceLang}#${normalizedTargetLang}`;
    
//     const getParams = {
//       TableName: TRANSLATIONS_TABLE,
//       Key: {
//         translationKey: queryKey
//       }
//     };
    
//     const existingItem = await dynamoDB.get(getParams).promise();
    
//     if (existingItem.Item) {
//       console.log('Result found in database cache');
//       return res.json({ 
//         original: query,
//         sourceLang: normalizedSourceLang,
//         targetLang: normalizedTargetLang,
//         translation: existingItem.Item.result.translation,
//         source: 'cache' 
//       });
//     }
    
//     // Step 2: Get the appropriate endpoint name
//     const endpointName = ENDPOINT_MAPPING[normalizedTargetLang];
//     if (!endpointName) {
//       return res.status(500).json({ 
//         error: `Endpoint configuration missing for target language: ${targetLang}` 
//       });
//     }
    
//     // Step 3: Query the appropriate model
//     console.log(`Querying model endpoint: ${endpointName}`);
    
//     const modelResponse = await queryModel(
//       query, 
//       normalizedSourceLang, 
//       normalizedTargetLang,
//       endpointName
//     );
    
//     // Step 4: Save result to DynamoDB for future use
//     const ttl = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); // 30 days from now in seconds
    
//     const putParams = {
//       TableName: TRANSLATIONS_TABLE,
//       Item: {
//         translationKey: queryKey,
//         query,
//         sourceLang: normalizedSourceLang,
//         targetLang: normalizedTargetLang,
//         result: modelResponse,
//         createdAt: new Date().toISOString(),
//         ttl: ttl
//       }
//     };
    
//     await dynamoDB.put(putParams).promise();
//     console.log('Result saved to DynamoDB cache');
    
//     // Step 5: Return response to client
//     return res.json({ 
//       original: query,
//       sourceLang: normalizedSourceLang,
//       targetLang: normalizedTargetLang,
//       translation: modelResponse.translation,
//       source: 'model'
//     });
    
//   } catch (error) {
//     console.error('Error processing translation request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Function to query the model endpoints
// async function queryModel(query, sourceLang, targetLang, endpointName) {
//   const params = {
//     EndpointName: endpointName,
//     Body: JSON.stringify({ 
//       text: query, 
//       source_language: sourceLang,
//       target_language: targetLang 
//     }),
//     ContentType: 'application/json'
//   };
  
//   try {
//     // Invoke the SageMaker endpoint
//     const modelResponse = await sagemakerRuntime.invokeEndpoint(params).promise();
    
//     // Parse the response
//     const responseBody = JSON.parse(Buffer.from(modelResponse.Body).toString());
//     return responseBody;
    
//   } catch (error) {
//     console.error('Error querying translation model:', error);
//     throw new Error(`Failed to get translation from model: ${error.message}`);
//   }
// }

// // Health check endpoint
// router.get('/health', (req, res) => {
//   res.json({ 
//     status: 'healthy', 
//     timestamp: new Date(),
//     version: '1.0.0'
//   });
// });

// // Stats endpoint
// router.get('/stats', async (req, res) => {
//   try {
//     // Get counts for all translations and by language
//     const params = {
//       TableName: TRANSLATIONS_TABLE,
//       Select: 'COUNT'
//     };
    
//     const totalCountResult = await dynamoDB.scan(params).promise();
//     const totalTranslations = totalCountResult.Count;
    
//     // Get counts by language pair - for Bafia
//     const bafiaParams = {
//       TableName: TRANSLATIONS_TABLE,
//       FilterExpression: 'targetLang = :targetLang',
//       ExpressionAttributeValues: {
//         ':targetLang': 'bafia'
//       },
//       Select: 'COUNT'
//     };
    
//     const bafiaResult = await dynamoDB.scan(bafiaParams).promise();
//     const bafiaCount = bafiaResult.Count;
    
//     // Get counts by language pair - for Fulfulde
//     const fulfuldeParams = {
//       TableName: TRANSLATIONS_TABLE,
//       FilterExpression: 'targetLang = :targetLang',
//       ExpressionAttributeValues: {
//         ':targetLang': 'fulfulde'
//       },
//       Select: 'COUNT'
//     };
    
//     const fulfuldeResult = await dynamoDB.scan(fulfuldeParams).promise();
//     const fulfuldeCount = fulfuldeResult.Count;
    
//     res.json({ 
//       totalTranslations,
//       byLanguage: {
//         bafia: bafiaCount,
//         fulfulde: fulfuldeCount
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     res.status(500).json({ error: 'Failed to fetch stats' });
//   }
// });

// // List supported language pairs
// router.get('/languages', (req, res) => {
//   res.json({
//     sourceLangs: ['english', 'french'],
//     targetLangs: ['bafia', 'fulfulde'],
//     supportedPairs: [
//       { source: 'english', target: 'bafia' },
//       { source: 'french', target: 'bafia' },
//       { source: 'english', target: 'fulfulde' },
//       { source: 'french', target: 'fulfulde' }
//     ]
//   });
// });

// // Clear cache endpoint (protected, for admin use)
// router.delete('/cache', async (req, res) => {
//   // This should be properly secured in production
//   const adminKey = req.headers['x-admin-key'];
  
//   if (adminKey !== process.env.ADMIN_API_KEY) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
  
//   try {
//     const { sourceLang, targetLang } = req.query;
    
//     // If specific language filters are provided
//     if (sourceLang || targetLang) {
//       // We need to scan and delete items individually
//       let filterExpression = '';
//       let expressionAttributeValues = {};
      
//       if (sourceLang && targetLang) {
//         filterExpression = 'sourceLang = :sourceLang AND targetLang = :targetLang';
//         expressionAttributeValues = {
//           ':sourceLang': sourceLang.toLowerCase(),
//           ':targetLang': targetLang.toLowerCase()
//         };
//       } else if (sourceLang) {
//         filterExpression = 'sourceLang = :sourceLang';
//         expressionAttributeValues = { ':sourceLang': sourceLang.toLowerCase() };
//       } else if (targetLang) {
//         filterExpression = 'targetLang = :targetLang';
//         expressionAttributeValues = { ':targetLang': targetLang.toLowerCase() };
//       }
      
//       const scanParams = {
//         TableName: TRANSLATIONS_TABLE,
//         FilterExpression: filterExpression,
//         ExpressionAttributeValues: expressionAttributeValues
//       };
      
//       const scanResult = await dynamoDB.scan(scanParams).promise();
//       let deletedCount = 0;
      
//       // Delete each item individually
//       for (const item of scanResult.Items) {
//         const deleteParams = {
//           TableName: TRANSLATIONS_TABLE,
//           Key: {
//             translationKey: item.translationKey
//           }
//         };
        
//         await dynamoDB.delete(deleteParams).promise();
//         deletedCount++;
//       }
      
//       return res.json({ 
//         message: 'Cache cleared successfully', 
//         deletedCount 
//       });
//     } else {
//       // If no filters, inform that deleting the entire table contents isn't supported
//       // through this API for safety reasons
//       return res.status(400).json({
//         error: 'Please specify at least one filter (sourceLang or targetLang). Deleting all items is not supported through this API.'
//       });
//     }
//   } catch (error) {
//     console.error('Error clearing cache:', error);
//     res.status(500).json({ error: 'Failed to clear cache' });
//   }
// });

// // Register all routes under /api
// app.use('/api', router);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({ 
//     error: 'Internal server error',
//     message: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Translation API server running on port ${PORT}`);
// });

// // Export for testing
// module.exports = app;