import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Button,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FormMessage from "./formMessage";

const DOBInput = ({ text, value, onChange, error = "" }) => {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());
  const [localError, setLocalError] = useState(error);

  const handleChange = (date) => {
    if (!date) return;

    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    if (age < 13) {
      setLocalError("You must be at least 13 years old.");
      onChange(null);
      return;
    }

    setLocalError("");
    onChange(date);
  };

  const confirmIOS = () => {
    handleChange(tempDate);
    setShow(false);
  };

  const formattedDate =
    value && value instanceof Date && !isNaN(value)
      ? value.toLocaleDateString()
      : "Select date of birth";

  return (
    <View style={{ gap: 5 }}>
      <Text style={styles.label}>{text}</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setTempDate(value || new Date());
          setShow(true);
        }}
      >
        <View
          style={[
            styles.inputWrapper,
            { borderColor: focused ? "#00D09E" : "#DFF7E2" },
          ]}
        >
          <Text style={styles.inputText}>{formattedDate}</Text>
          <MaterialIcons name="calendar-today" size={22} color="#555" />
        </View>
      </TouchableOpacity>

      <FormMessage message={localError} type="error" />

      {/* Picker */}
      {show &&
        (Platform.OS === "android" ? (
          <DateTimePicker
            value={tempDate}
            mode="date"
            maximumDate={new Date()}
            display="default"
            onChange={(event, selectedDate) => {
              if (event.type === "dismissed") {
                setShow(false);
                return;
              }
              if (selectedDate) {
                handleChange(selectedDate);
                setShow(false);
              }
            }}
          />
        ) : (
          // iOS: use a modal to make it visible
          <Modal transparent animationType="slide">
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.3)",
                
              }}
            >
              <View
                style={{
                  backgroundColor: "#555",
                  paddingTop: 10,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    if (selectedDate) setTempDate(selectedDate);
                  }}
                />
                <Button title="Done" onPress={confirmIOS} />
              </View>
            </View>
          </Modal>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontFamily: "PoppinsRegular", fontSize: 15, color: "black" },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#DFF7E2",
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 12,
    height: 45,
  },
  inputText: { fontFamily: "PoppinsRegular", color: "black", fontSize: 15 },
});

export default DOBInput;