import { Card, CardBody, Typography } from "@material-tailwind/react";

import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Course } from "@/types/types";
import { primary } from "@/constants/colors";

export function PurchasedCard({
  purchasedCourses,
}: {
  purchasedCourses: Course[];
}) {
  return (
    <Card
      className="mt-6 w-[78vw] mx-auto shadow-lg"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        className="px-10 py-5"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex items-center gap-4">
          <BanknotesIcon className={`h-20 w-20 text-${primary}-500`} />
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Purchased Assets
          </Typography>
        </div>
        <div className="flex ml-24 gap-20">
          <div className="flex flex-col items-center">
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="lead"
              color="blue-gray"
            >
              Number of Assets
            </Typography>
            <Typography
              variant="h6"
              color={primary}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {purchasedCourses.length}
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="lead"
              color="blue-gray"
            >
              Amount Spent
            </Typography>
            <Typography
              variant="h6"
              color={primary}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              ${purchasedCourses.reduce((acc, course) => acc + course.price, 0)}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
