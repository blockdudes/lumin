"use client";
import { Typography } from "@material-tailwind/react";
import { toEther } from "thirdweb";

const TABLE_HEAD = ["Course", "Purchase Date", "Amount"];

export function PurchasedTable({
  data,
}: {
  data: { title: string; transactionDate: string; price: string }[];
}) {
  return (
    <div className="relative shadow-md sm:rounded-lg max-h-[450px] overflow-x-auto overflow-y-scroll">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-md uppercase bg-blue-gray-50 sticky top-0 z-10 text-blue-500">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="py-5 px-6 border-b border-blue-gray-100"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((course, index) => (
            <tr key={index} className="bg-white even:bg-blue-gray-50">
              <td className="py-4 px-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {course.title}
                </Typography>
              </td>
              <td className="py-4 px-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {new Date(
                    Number(course.transactionDate) * 1000
                  ).toDateString()}
                </Typography>
              </td>
              <td className="py-4 px-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {toEther(BigInt(course.price))} ETH
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
