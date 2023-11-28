import { NavLink } from "react-router-dom"

export const Header = () => {
  return (
     <div className="flex p-4 justify-between items-center mb-10 border-b-[1px] bg-gray-300 ">
        <NavLink to="/" className="text-[14px] sm:text-[28px] md:text-[26px] font-[700]">Attendance Management System</NavLink>
        <NavLink to={'/monthlyReport'} className="text-[14px] border-[1px] border-solid p-2 rounded-md cursor-pointer" >Monthly Report</NavLink>
     </div>
  )
}
