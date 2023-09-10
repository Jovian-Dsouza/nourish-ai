import React, { createContext, useState, useEffect, useMemo } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

const MODEL_URL =
  "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_035_224/feature_vector/3/default/1";

const ModelContext = createContext();

const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);
  const isModelLoading = useMemo(()=>(!model), [model])

  const loadModel = async () => {
    try {
      await tf.ready();
      const loadedModel = await tf.loadGraphModel(MODEL_URL, {
        fromTFHub: true,
      });
      setModel(loadedModel);
      console.log(`Model from ${MODEL_URL} Loaded`);
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  useEffect(() => {
    if (!model) {
      loadModel();
    }
  }, []);

  return (
    <ModelContext.Provider
      value={{ isModelLoading, model }}
    >
      {children}
    </ModelContext.Provider>
  );
};


export { ModelProvider, ModelContext };
