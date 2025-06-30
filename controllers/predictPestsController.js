const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');
const path = require('path');
require('dotenv').config();
const modelPath = process.env.MODEL_PESTS_PATH;


let model;
class CustomL2Regularizer extends tf.regularizers.l2 {
    static className = 'L2';

    constructor(config) {
        super({ l2: config.l2 || 0.01 });
    }
}

tf.serialization.registerClass(CustomL2Regularizer);


async function loadModel() {
    try {
        console.log(`Loading model from: ${modelPath}`);
        model = await tf.loadGraphModel(`file://${modelPath}`);
        console.log("Model loaded successfully.");
    } catch (error) {
        console.error("Error loading model:", error);
    }
}

function getBestMatches(classProbabilities,classes)
{
    const prob={}
    for(i=0;i<classes.length;i++)
        prob[classes[i]]=classProbabilities[i]
    const top3 = Object.entries(prob).sort((a, b) => b[1] - a[1])  
    .slice(0, 3) 
    .reduce((obj, [key, value]) => {
      obj[key] = value*100; 
      return obj;
    }, {});

    console.log(top3)
    return top3

}

async function predictPestClass(imagePath)
 {
    if (!model) {
        throw new Error('Model not loaded. Please ensure the model is loaded before making predictions.');
    }
    const imageBuffer = await sharp(imagePath)
        .resize({ width: 224, height: 224 })  
        .toBuffer();

    const tensor = tf.node.decodeImage(imageBuffer)
        .expandDims(0)
        .div(tf.scalar(255.0));  
    
    const prediction = model.predict(tensor);
    const classProbabilities = prediction.dataSync();
    const predictedClassIndex = classProbabilities.indexOf(Math.max(...classProbabilities));
    
    const classes = [
        'Ant', 'Aphids', 'Bee', 'Beetle', 
        'Caterpillar', 'Earthworm', 'Grasshopper', 'No Pests',
        'Sawfly', 'Slug', 'Snail', 'Wasp'
    ];

    const prob=getBestMatches(classProbabilities,classes)
   
    return {
        predictedClass: classes[predictedClassIndex],
        probability: classProbabilities[predictedClassIndex],
        allProb:prob
    };
}


async function handlePestPhotoPrediction(req, res)
 {
    try {
        const imagePath = req.file.path;
        const result = await predictPestClass(imagePath);
        console.log(result);
        
        res.json({
            message: "Pest photo processed successfully",
            predictedClass: result.predictedClass,
            probability: result.probability,
            allProb:result.allProb
        });
    } catch (error) {
        console.error("Prediction error:", error);
        res.status(500).json({ error: "Error processing pest photo" });
    }
}

module.exports = {
    handlePestPhotoPrediction: handlePestPhotoPrediction,
    predictPestClass: predictPestClass
};

loadModel();
