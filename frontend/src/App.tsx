import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllStaff } from './api/staffApi';
import { setStaffData } from './store/slices/StaffSlice';
import { useDispatch } from 'react-redux';
import HomePage from './pages/HomePage';
import { Header } from './components/Header';
import { ReportPage } from './pages/ReportPage';
import { setAttendanceData } from './store/slices/AttendanceSlice';
import { aggregateAttendanceByDate } from './function/attendanceFunction';
import { getAttendanceByMonth } from './api/attendanceApi';
import { getMonthAndYearForCalendarDate } from './function/common';


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
     getAllStaff().then(data=>{
      dispatch(setStaffData(data))
     })
  },[dispatch])
  useEffect(() => {

    const { month, year } = getMonthAndYearForCalendarDate(new Date().toISOString());
    getAttendanceByMonth(month, year)
      .then((data) => aggregateAttendanceByDate(data.data))
      .then((aggregatedData) => {
        Object.entries(aggregatedData).forEach((entry) => {
          dispatch(setAttendanceData({ date: entry[0], data: entry[1] }));
        });
      });
  
  },[dispatch]);
  return (
   

    <Router>
        <Header/>
      <Routes>
        <Route path="/"  element={<HomePage/>} />
        <Route path="/monthlyReport" element={<ReportPage/>} />
      </Routes>
    </Router>
  
  );
};

export default App;
