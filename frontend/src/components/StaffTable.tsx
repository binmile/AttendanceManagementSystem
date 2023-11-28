import { capitalize } from "lodash";
import { useState } from "react";
import Modal from "react-modal";
import { saveCalculateAndSaveSalary } from "../api/salaryApi";
export interface StaffDataType {
  staffId: number;
  name: string;
  salary: number;
  absentCount: number;
  presentCount: number;
  isCalculated: boolean;
}

export type StaffData = StaffDataType[];

Modal.setAppElement("#root");

export const SalaryModal = ({
  isOpen,
  onClose,
  data,
  days,
  month,
  year,
  change
}: {
  isOpen: boolean;
  onClose: () => void;
  data: StaffDataType;
  days: number;
  month:string;
  year: string;
  change:()=>void
}) => {
  const calculateSalary = (data: StaffDataType) => {
    return Math.round((data.presentCount / days) * data.salary);
  };

  const salaryData = calculateSalary(data);

  const saveSalary = () => {
    saveCalculateAndSaveSalary({calculated_salary:salaryData,emp_id:data.staffId,salary_month:month,salary_year:year});
    setTimeout(()=>{
        change();
    },500);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Salary Calculation Modal"
      className="flex justify-center items-center"
    >
      <div className="p-6 bg-white mt-8 rounded-md shadow-md relative" >
        <h1 className="text-3xl font-bold mb-4">Salary Calculation</h1>
        <p>
          Here's the salary breakdown of{" "}
          <span className="font-bold text-lg">{capitalize(data.name)}</span>
        </p>
        <p className="mb-2">
          <span className="font-bold">Monthly Salary : </span> {Math.round(data.salary)}
        </p>
        <p className="mb-2">
          <span className="font-bold">Day in a month : </span> {days} days
        </p>
        <p className="mb-2">
          <span className="font-bold">Number of attended days : </span>{" "}
          {data.presentCount} days
        </p>
        <p className="mb-2">
          <span className="font-bold">Salary Per Day : </span>
          {Math.round(data.salary / days)}
        </p>
        <p className="mb-4">
          <span className="font-bold">calculation for salary : </span>
          (number of attended day) * (Salary Per Day)
        </p>
        <p className="mb-4">
          <span className="font-bold">calculated salary : </span>
          <b>{Math.round(salaryData)}</b>
        </p>
        <div className="flex justify-between">
        {data.isCalculated ? null : <button onClick={saveSalary} className="bg-green-400 text-white p-2 rounded-md">save salary</button>}
        <button onClick={onClose} className="bg-red-400 p-2 text-white rounded-md" >close</button>

        </div>
      </div>
    </Modal>
  );
};

const StaffTable = ({
  staffData,
  disable = false,
  days,
  month,
  year,
  change
}: {
  staffData: StaffData;
  disable: boolean;
  days: number;
  month: string;
  year: string;
  change:()=>void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<StaffDataType | null>(null);

  const openModal = (employee: StaffDataType) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <table className="min-w-full border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-6 px-20 border-b">Staff ID</th>
            <th className="py-6 px-20 border-b">Name</th>
            <th className="py-6 px-20 border-b">Salary</th>
            <th className="py-6 px-20 border-b">Number of Absent Days</th>
            <th className="py-6 px-20 border-b">Number of Present Days</th>
            <th className="py-6 px-20 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff.staffId} className="hover:bg-gray-50">
              <td className="py-6 px-20 border-b">{staff.staffId}</td>
              <td className="py-6 px-20 border-b"> {capitalize(staff.name)}</td>
              <td className="py-6 px-20 border-b">
                {Math.round(staff.salary)}
              </td>
              <td className="py-6 px-20 border-b">{staff.absentCount}</td>
              <td className="py-6 px-20 border-b">{staff.presentCount}</td>
              <td className="py-6 px-20 border-b">
                <button
                  onClick={() => openModal(staff)}
                  disabled={disable}
                  className={
                    "border-[1px] border-solid p-2 rounded-md " +
                    (disable ? "cursor-not-allowed" : "")
                  }
                  type="button"
                >
                  {staff.isCalculated
                    ? "✅ calculated salary"
                    : "calculate salary"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEmployee && (
        <SalaryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={selectedEmployee}
          days={days}
          month={month}
          year={year}
          change={change}
        />
      )}
    </>
  );
};

export default StaffTable;
