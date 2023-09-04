import React, { useState, useRef, useEffect } from "react";
import { ActivityIndicator, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons"; // Import the redo icon
import AppLayout from "../../layouts/AppLayout";
import { Camera } from "expo-camera";
import styles from "./styles";
import useModel from "../../hooks/useModel";
import { decode } from "base-64";

const FoodScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef(null);
  const { predict } = useModel();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    setIsLoading(true); // Start loading state
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const pic = await cameraRef.current.takePictureAsync(options);
        const prediction = await predict(pic.base64);
        console.log("Prediction done: ", prediction);
      } catch(e) {
        console.error("Error predicting:", e);
      }
    }
    setIsLoading(false);
  };

  const detectFood = (imageData) => {
    // This is where you'd send the image data to your model for processing.
    // Example:
    // const result = await model.detectFood(imageData);
    // handleResult(result);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <AppLayout>
      <View style={{ flex: 1 }}>
        {/* {capturedImage ? (
          <>
            <Image
              source={{ uri: capturedImage }}
              style={styles.imagePreview}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setCapturedImage(null)}
              >
                <FontAwesomeIcon icon={faRedo} color="white" size={24} />
              </TouchableOpacity>
            </View>
          </>
        ) : ( */}
        <Camera
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
        >
          <View style={styles.container}>
            <ButtonContainer onPress={takePicture} isLoading={isLoading} />
          </View>
        </Camera>
        {/* )} */}
      </View>
    </AppLayout>
  );
};

const ButtonContainer = ({ onPress, isLoading }) => (
  <View style={styles.buttonContainer}>
    {isLoading ? (
      <ActivityIndicator size="large" color="orange" />
    ) : (
      <TouchableOpacity style={styles.captureButton} onPress={onPress}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
    )}
  </View>
);

export default FoodScanner;
