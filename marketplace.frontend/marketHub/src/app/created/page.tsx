"use client";
import React, { useEffect, useState } from "react";
import { CourseCard } from "@/components/courseComponents/courseCard";
import { MultiSelect } from "@/components/courseComponents/multiselect";
import { eduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Marketplace } from "@/types/types";

const MarketplacePage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const account = useActiveAccount();
  const [data, setData] = useState<Marketplace[]>([]);
  const { data: categoryOptions } = useReadContract({
    contract: contract(eduChain),
    method: "function getCategories() external view returns (string[])",
    params: [],
  });

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      fetch(`/api/createdMarketplace/${account.address}`, {
        cache: "no-cache",
        next: {
          revalidate: 0
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
        })
        .finally(() => {
          dispatch(setIsAppLoading(false));
        });
    }
  }, [account]);

  const handleOpen = (marketplace: Marketplace) => {
    console.log("clicked");
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const filteredData =
    selectedCategories.length > 0
      ? data.filter((marketplace) =>
        marketplace.categories.some((category) =>
          selectedCategories.includes(category)
        )
      )
      : data;

  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="flex gap-2 items-center">
<<<<<<< HEAD
        <div className="text-2xl font-bold">Markets</div>
=======
        <div className="text-2xl font-bold">Courses</div>
>>>>>>> e5c8a9d37ed1edd31d0b51cb698b65d9f721704a
        <MultiSelect
          options={
            categoryOptions !== undefined
              ? categoryOptions.map((option) => ({
                value: option,
                label: option,
              }))
              : undefined
          }
          onChange={handleCategoryChange}
        />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="grid grid-cols-3 gap-5 pt-4">
          {filteredData.map((marketplace) => (
            <CourseCard
              key={marketplace.id}
              img={marketplace.image_url}
              title={marketplace.marketplaceName}
              description={marketplace.description}
              onClick={() => handleOpen(marketplace)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
