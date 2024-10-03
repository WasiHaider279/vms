"use client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TrafficChart from "@/components/global/PieChart";
import StatsCard from "@/components/global/StatsCard";
import {
  useOrdersStatusQuery,
  useOrdersSummaryQuery,
  useProductsSummaryQuery,
  useRevenueSummaryQuery,
} from "@/redux/services/dashboardApi";
import BarsChart from "@/components/global/BarsChart";
import DropdownButton from "@/components/global/DropdownButton";
import { IoIosArrowDown } from "react-icons/io";
import { useQueryString } from "@/hooks/useQueryString";
import { useGetCurrentUserQuery } from "@/redux/services/authApi";
import moment from "moment";

const Dashboard = () => {
  const routeParams = useQueryString();
  // Get user Profile
  const { data: userData, isLoading: userLoading } = useGetCurrentUserQuery({});
  // total Sales Api
  const {
    data: salesData,
    isLoading,
    isFetching,
  } = useOrdersSummaryQuery(routeParams.getAll());
  // total Revenue Api
  const { data: revenueData, isLoading: revenueLoading } =
    useRevenueSummaryQuery(routeParams.getAll());
  // total Products Api
  const { data: productsData, isLoading: productsLoading } =
    useProductsSummaryQuery(routeParams.getAll());
  // Order Status Api's
  const { data: shippedOrdersData, isLoading: shippedOrdersLoading } =
    useOrdersStatusQuery({
      status: "Shipped",
    });
  const { data: pendingOrdersData, isLoading: pendingOrdersLoading } =
    useOrdersStatusQuery({
      status: "Pending",
    });
  const { data: processingOrdersData, isLoading: processingOrdersLoading } =
    useOrdersStatusQuery({
      status: "Processing",
    });
  const durations = [
    { name: "Hourly", value: "hourly" },
    { name: "Daily", value: "daily" },
    { name: "Monthly", value: "monthly" },
    { name: "Yearly", value: "year" },
  ];

  if (
    !isLoading &&
    !revenueLoading &&
    !productsLoading &&
    !shippedOrdersLoading &&
    !pendingOrdersLoading &&
    !processingOrdersLoading
  ) {
    return (
      <div className="">
        <div className="flex items-center gap-8 mb-4">
          <img
            src={userData?.data?.image}
            alt="user profile"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h1 className="font-bold">Welcome {userData?.data?.name}!</h1>
            <p>
              {moment(userData?.data?.createdAt, "YYYYMMDD").format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </p>
          </div>
        </div>

        {/* Website stats orders, revenue and Products  */}
        <div className="w-full flex gap-6 flex-col xl:flex-row mb-4">
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6 lg:justify-between   w-full  ">
            <StatsCard
              fillColor="#1C64F2"
              stats={
                salesData?.data?.coordinates
                  ? salesData?.data?.coordinates
                  : [{}]
              }
              statsPercentage={salesData?.data?.rate}
              heading="Total sales"
              total={salesData?.data?.total}
            />
            <StatsCard
              fillColor="#1C64F2"
              stats={
                revenueData?.data?.coordinates
                  ? revenueData?.data?.coordinates
                  : [{}]
              }
              statsPercentage={revenueData?.data?.rate}
              heading="Total Revenue"
              total={revenueData?.data?.total}
            />

            <StatsCard
              fillColor="#1C64F2"
              stats={
                productsData?.data?.coordinates
                  ? productsData?.data?.coordinates
                  : [{}]
              }
              statsPercentage={productsData?.data?.rate}
              heading="Total Products"
              total={productsData?.data?.total}
            />
          </div>
          {/* Traffic of website  */}
          <div className="bg-white p-6 w-full xl:w-[35%] 2xl:w-[50%] h-fit rounded-lg ">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Traffic</h1>
              {/* <button className="p-1.5 rounded-lg bg-gray-100" type="button">
                ...
              </button> */}
            </div>
            <div className=" justify-start items-center gap-1.5">
              <div className="text-blue-700 text-xs font-medium font-['Inter'] leading-[15px]">
                31 Nov - 31 Dec
              </div>
              <div className="w-2.5 h-2.5 relative" />
            </div>
            <TrafficChart />
          </div>
        </div>
        {/* Orders Stats */}
        <h1 className="font-bold text-2xl mb-4">Orders</h1>
        <div className="flex-col flex ">
          <div className="flex flex-col justify-between lg:flex-row w-full flex-wrap gap-2">
            <StatsCard
              fillColor="#16BDCA"
              stats={
                shippedOrdersData?.data?.coordinates
                  ? shippedOrdersData?.data?.coordinates
                  : [{}]
              }
              statsPercentage={shippedOrdersData?.data?.rate}
              heading="Shipped Orders"
              total={shippedOrdersData?.data?.total}
            />
            <StatsCard
              fillColor="#FDBA8C"
              stats={
                pendingOrdersData?.data?.coordinates
                  ? pendingOrdersData?.data?.coordinates
                  : [{}]
              }
              statsPercentage={pendingOrdersData?.data?.rate}
              heading="Pending Orders"
              total={pendingOrdersData?.data?.total}
            />
            <StatsCard
              fillColor="#D03801"
              stats={
                processingOrdersData?.data?.coordinates
                  ? processingOrdersData?.data?.coordinates
                  : [{}]
              }
              statsPercentage={processingOrdersData?.data?.rate}
              heading="Processing Orders"
              total={processingOrdersData?.data?.total}
            />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between mt-8">
            <div className=" relative shadow-lg md:w-1/2 border border-gray-100 rounded-lg p-6">
              <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-300">
                <h1 className="font-bold text-2xl">Total Order Count</h1>
                <DropdownButton
                  title={"Products"}
                  options={durations}
                  onChange={(duration: string) => {
                    routeParams.set({ name: "duration", value: duration });
                  }}
                />
                {/* <div className="bg-[#DEF7EC] rounded-lg text-[#03543F] px-[10px] py-0.5">
                  24%
                </div> */}
              </div>
              {isFetching ? (
                <SkeletonTheme highlightColor="#444" width={"100%"}>
                  <p>
                    <Skeleton count={1} height={240} width={"100%"} />
                  </p>
                </SkeletonTheme>
              ) : (
                <BarsChart
                  stats={salesData?.data?.coordinates}
                  fillColor="#1C64F2"
                />
              )}
            </div>
            <div className="shadow-lg md:w-1/2  border border-gray-100 rounded-lg p-6">
              <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-300">
                <h1 className="font-bold text-2xl">Total Order Value</h1>
                <DropdownButton
                  title={"orders"}
                  options={durations}
                  onChange={(duration: string) => {
                    routeParams.set({ name: "duration", value: duration });
                  }}
                />
              </div>
              <BarsChart
                stats={revenueData?.data?.coordinates}
                fillColor="#FDBA8C"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="flex gap-4 mb-4">
          <Skeleton
            height={200}
            width={"35vw"}
            className={"border rounded-lg"}
          />
          <Skeleton
            height={200}
            width={"35vw"}
            className={"border rounded-lg"}
          />
        </div>
        <Skeleton
          height={200}
          width={"71vw"}
          className={"border h- rounded-lg mb-4"}
        />
        <Skeleton height={200} width={"71vw"} className={"border rounded-lg"} />
      </div>
    );
  }
};

export default Dashboard;
