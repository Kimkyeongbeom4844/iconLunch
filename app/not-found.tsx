"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const NotFound = () => {
  useEffect(() => {
    redirect("/");
  }, []);
  return null;
};

export default NotFound;
