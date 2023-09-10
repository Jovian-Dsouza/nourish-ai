import React, { useState, useEffect, useContext } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import { decode } from "base-64";
import imagenetSimpleLabels from "../constants/imagenet-simple-labels";
import { ModelContext } from "./ModelProvider";

function useModel() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  const { model, isModelLoading } = context;

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
    return crop.div(255);
  }

  function base64ToUint8Array(base64) {
    const binary_string = decode(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  async function predict(base64) {
    setTimeout(() => {
    }, 200);
    return {
      "className" : "Burger"
    }
  }

  // async function predict(base64) {
  //   var result = {};
  //   if (!model) {
  //     console.error("Model not loaded yet.");
  //     return result;
  //   }
  //   //Load image
  //   const imageData = base64ToUint8Array(base64);

  //   // Preprocess the image
  //   const imageTensor = decodeJpeg(imageData);
  //   const preprocessedImage = preprocess(imageTensor);
  //   console.log("Processing successfull");

  //   // Make predictions
  //   const predictions = await model.predict(preprocessedImage);

  //   // Process and display predictions
  //   const topPredictions = Array.from(predictions.dataSync())
  //     .map((score, classIdx) => ({ score, classIdx }))
  //     .sort((a, b) => b.score - a.score)
  //     .slice(0, 1); // Get the top 5 predictions
  //   // console.log("Top Predictions:", imagenetSimpleLabels[topPredictions[0].classIdx]);
  //   const topClass = topPredictions[0];
  //   return {
  //     classIdx: topClass.classIdx,
  //     className: imagenetSimpleLabels[topClass.classIdx],
  //     score: topClass.classIdx,
  //   };
  // }

  // useEffect(() => {
  //   (async () => {
  //     await loadModel();
  //   })();
  // }, []);

  return { model, predict };
}

export default useModel;
