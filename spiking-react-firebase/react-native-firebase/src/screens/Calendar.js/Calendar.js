import CalendarPicker from "react-native-calendar-picker";

export default function CalendarPopUp({ setSelectedStartDate, setIsClicked }) {
  const handleSubmit =(e)=>{
    setSelectedStartDate(e)
    setIsClicked(false)
  }
  return <CalendarPicker onDateChange={(e)=>{handleSubmit(e)}} />;
}
