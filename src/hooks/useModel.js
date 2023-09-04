import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { Image } from "react-native";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";

function useModel() {
  const [model, setModel] = useState(null);
  const [isTfReady, setIsTfReady] = useState(false);

  async function loadModel() {
    try {
      await tf.ready();
      const modelUrl =
        "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_large_075_224/feature_vector/5/default/1";
      const loadedModel = await tf.loadGraphModel(modelUrl, {
        fromTFHub: true,
      });
      setModel(loadedModel);
      console.log(`${modelUrl} Loaded`);
    } catch (error) {
      console.error("Error loading model:", error);
    }
  }

  function preprocess(imageTensor) {
    const widthToHeight = imageTensor.shape[1] / imageTensor.shape[0];
    let squareCrop;
    if (widthToHeight > 1) {
      const heightToWidth = imageTensor.shape[0] / imageTensor.shape[1];
      const cropTop = (1 - heightToWidth) / 2;
      const cropBottom = 1 - cropTop;
      squareCrop = [[cropTop, 0, cropBottom, 1]];
    } else {
      const cropLeft = (1 - widthToHeight) / 2;
      const cropRight = 1 - cropLeft;
      squareCrop = [[0, cropLeft, 1, cropRight]];
    }
    // Expand image input dimensions to add a batch dimension of size 1.
    const crop = tf.image.cropAndResize(
      tf.expandDims(imageTensor),
      squareCrop,
      [0],
      [224, 224]
    );
    // Add a check before the division operation
    if (!crop || crop.shape.length === 0) {
      console.error("Crop tensor is not initialized properly");
      return;
    }
    console.log(crop.dtype)
    console.log("Crop", crop)
    return crop.div(255);
  }

  async function predict() {
    if (!model) {
      console.error("Model not loaded yet.");
      return;
    }
    console.log("model is loaded")

    // Load the image
    // const image = require("./basketball.jpg");
    // const imageAssetPath = Image.resolveAssetSource(image);
    // const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
    // const imageDataArrayBuffer = await response.arrayBuffer();
    // const imageData = new Uint8Array(imageDataArrayBuffer);

    // Preprocess the image
    // const imageTensor = tf.node.decodeImage(imageData, 3);
    const imageTensor = decodeJpeg(imageData);
    const preprocessedImage = preprocess(imageTensor);
    console.log("Processing successfull")

    // Make predictions
    const predictions = await model.predict(preprocessedImage);

    // Process and display predictions
    const topPredictions = Array.from(predictions.dataSync())
      .map((score, classIdx) => ({ score, classIdx }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Get the top 5 predictions

    console.log("Top Predictions:", topPredictions);

    // You can set the top predictions state or display them as needed
  }

  const initializeTensorflow = async () => {
    try {
      await loadModel();
      setIsTfReady(true);

      await predict();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initializeTensorflow();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await predict();
  //   })();
  // }, [model]);

  return { isTfReady, model };
}

export default useModel;
