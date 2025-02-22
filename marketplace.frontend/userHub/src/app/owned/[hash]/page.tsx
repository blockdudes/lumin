"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Course, FetchedResource } from "@/types/types";
import { ChapterBar } from "@/components/courseComponents/chapterBar";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import MDEditor from "@uiw/react-md-editor";
import { useActiveAccount } from "thirdweb/react";
import { setOwnedResources } from "@/lib/features/ownedResources/ownedResourcesSlice";

const CourseDetails = () => {
  const navigate = useRouter();
  const { hash } = useParams<{ hash: string }>();
  const dispatch = useAppDispatch();
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [courseDetails, setCourseDetails] = useState<
    | (Course & {
      resource: FetchedResource[];
    })
    | null
  >(null);
  const account = useActiveAccount();
  const allResources = useAppSelector(
    (state) => state.ownedResources.ownedResources
  );
  const setAllResources = (data: Course[]) => {
    dispatch(setOwnedResources(data));
  };
  console.log(allResources);

  const init = async () => {
    console.log("getting data");
    var allResource = allResources;
    console.log(allResource);
    if (!allResource || allResource.length === 0) {
      dispatch(setIsAppLoading(true));
      if (!account) {
        return;
      }
      await fetch(`/api/getAllowListedResource`, {
        cache: "no-cache",
        next: {
          revalidate: 0,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAllResources(data.data);
          allResource = data.data;
        })
        .finally(() => {
          dispatch(setIsAppLoading(false));
        });
    }
    dispatch(setIsAppLoading(true));
    await fetch(`/api/resources/fetch/${hash}`, {
      cache: "no-cache",
      next: {
        revalidate: 0,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const courseDetails = {
          ...data.data,
          ...allResource.find((resource) => resource.resourceHash === hash),
        };
        courseDetails.resource = Object.values(data.data.resource);
        setCourseDetails(courseDetails);
        console.log("courseDetails", courseDetails);
      })
      .finally(() => {
        dispatch(setIsAppLoading(false));
      });
  };

  useEffect(() => {
    init();
  }, [account, hash, navigate]);

  if (courseDetails === null) {
    return null;
  }

  const FileRenderer = ({ type, url }: { type: string; url: string }) => {
    if (type.startsWith("video/")) {
      return <video controls src={url} className="w-full" />;
    } else if (type.startsWith("image/")) {
      return <img src={url} alt="Chapter content" className="w-full" />;
    } else if (type === "application/pdf") {
      return (
        <object data={url} type="application/pdf" width="100%" height="450">
          <p>
            Your browser does not support PDFs.
            <a href={url}>Download the PDF</a>.
          </p>
        </object>
      );
    } else if (type.startsWith("text/")) {
      return <iframe src={url} className="min-w-full min-h-full" />;
    } else {
      return <p>Unsupported file type</p>;
    }
  };

  console.log("courseDetails", courseDetails);

  return (
    <div className="pr-[350px]">
      <div className="fixed top-0 right-0">
        <ChapterBar
          chapters={courseDetails.resource}
          selectedChapterIndex={selectedChapterIndex}
          setSelectedChapterIndex={setSelectedChapterIndex}
          hasStarted={hasStarted}
        />
      </div>
      {!hasStarted ? (
        <div className="w-full flex flex-col items-center gap-4 p-4">
          <h1 className="text-3xl font-bold text-center">
            {courseDetails.title}
          </h1>
          <div className="w-full flex justify-center items-center">
            <img
              src={courseDetails.image_url}
              alt={courseDetails.title}
              className="max-w-full h-auto rounded-lg shadow-lg"
              style={{ maxWidth: "90%", maxHeight: "70vh" }}
            />
          </div>
          <p className="text-lg">{courseDetails.description}</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => setHasStarted(true)}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-5 p-4">
          {courseDetails.resource.map((chapter, index) => (
            <div
              key={chapter.title}
              className={`transition-opacity duration-500 ${index === selectedChapterIndex
                  ? "opacity-100"
                  : "opacity-0 hidden"
                }`}
            >
              <h2 className="text-2xl font-bold">{chapter.title}</h2>
              <p className="text-lg text-gray-800 font-medium">
                {chapter.description}
              </p>
              <FileRenderer type={chapter.type} url={chapter.file} />
              <div className="text-base whitespace-pre-wrap text-gray-600 pt-10">
                <div className="container">
                  <div data-color-mode="light">
                    <MDEditor.Markdown source={chapter.content} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
