import { Card, CardBody, Typography } from "@material-tailwind/react";

import { BanknotesIcon } from "@heroicons/react/24/outline";
import { toEther } from "thirdweb";

export function RevenueCard({
  publicAssets,
  privateAssets,
}: {
  publicAssets: number;
  privateAssets: number;
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
          <BanknotesIcon className="h-20 w-20 text-blue-500" />
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Revenue
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
              Public Assets
            </Typography>
            <Typography
              variant="h6"
              color="blue"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {toEther(BigInt(publicAssets))} ETH
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
              Private Assets
            </Typography>
            <Typography
              variant="h6"
              color="blue"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {privateAssets} ETH
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
