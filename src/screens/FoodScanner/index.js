import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Button,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons"; // Import the redo icon
import AppLayout from "../../layouts/AppLayout";
import { Camera } from "expo-camera";
import styles from "./styles";
import useModel from "../../hooks/useModel";
import { decode } from "base-64";
import ScanResultView from "../../components/ScanResultView";
import { COLORS } from "../../constants";

const testDectionData = {
  "confidence": 95.7,
  "image": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fnourish-ai-300bda4c-9066-4e65-a0a0-10784dca77a7/Camera/c4638f30-70ac-4b2d-b54f-6c9f3afcba49.jpg",
  "name": "Burger",
  "nutrition":  {
    "calories": 285,
    "carbohydrates": "36g",
    "fats": "10g",
    "proteins": "12g",
  },
}

const FoodScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
//   const [detectedFood, setDetectedFood] = useState(null);
  const [detectedFood, setDetectedFood] = useState(testDectionData);
  const cameraRef = useRef(null);
  const { predict } = useModel();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const detectFood = async () => {
    if (cameraRef.current) {

      try {
        const options = { quality: 0.5, base64: true };

        const pic = await cameraRef.current.takePictureAsync(options);
        const prediction = await predict(pic.base64);
        const detectionData = {
          image: pic.uri,
          name: prediction.className,
          confidence: 95.7,
          nutrition: {
            calories: 285,
            fats: "10g",
            carbohydrates: "36g",
            proteins: "12g",
          },
        };

        setDetectedFood(detectionData);
        // console.log("Prediction done: ", prediction);
      } catch (e) {
        console.error("Error predicting:", e);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <AppLayout statuBarColor={COLORS.orange}>
      <View style={{ flex: 1 }}>
        {detectedFood ? (
          <ScanResultView
            data={detectedFood}
            onRetake={() => setDetectedFood(null)}
          />
        ) : (
            
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            ref={cameraRef}
          >
            <View style={styles.container}>
              <ButtonContainer onPress={detectFood} isLoading={isLoading} />
            </View>
          </Camera>
        )}
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
