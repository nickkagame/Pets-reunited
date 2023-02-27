import CalendarPicker from "react-native-calendar-picker";

export default function CalendarPopUp({ setSelectedStartDate }) {
  return <CalendarPicker onDateChange={setSelectedStartDate} />;
}
