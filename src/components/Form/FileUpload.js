import Uppy from "@uppy/core";
import React from "react";
import Tus from "@uppy/tus";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { DashboardModal, useUppy } from "@uppy/react";
import GoogleDrive from "@uppy/google-drive";

export default function FileUpload(props) {
  const uppy = useUppy(() => {
    return new Uppy()
      .use(GoogleDrive, {
        companionUrl: "https://companion.uppy.io/connect/drive/callback",
      })
      .use(Tus, { endpoint: "https://tusd.tusdemo.net/files" });
  });

  return (
    <DashboardModal uppy={uppy} open={props.open} plugins={["GoogleDrive"]} />
  );
}
