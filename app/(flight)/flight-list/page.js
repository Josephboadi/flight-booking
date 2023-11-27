"use client";
import CheckboxCustom from "@/components/Checkbox";
import Loader from "@/components/Loader";
import CustomRangeSlider from "@/components/RangeSlider";
import { getflightsRequest } from "@/components/redux/slice/flights";
import { flightList } from "@/public/data/flightlist";
import { SearchIcon } from "@/public/data/icons";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    // touchPoint: yup.string().required("Touch point is required."),
    // reviewTypeId: yup.string().required("Review type is required."),
    // title: yup.string().required("Feedback title is required."),
  })
  .required();

const Page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchdata = searchParams.get("searchdata");
  const [flightData, setFlightData] = useState([]);
  const [airlineData, setAirlineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([24, 62]);
  const [earlyMorning, setEarlyMorning] = useState(false);
  const [morning, setMorning] = useState(false);
  const [midDay, setMidDay] = useState(false);
  const [eveningNight, setEveningNight] = useState(false);
  const [night, setNight] = useState(false);

  const [nonStop, setNonStop] = useState(false);
  const [oneStop, setOneStop] = useState(false);
  const [twoStop, setTwoStop] = useState(false);
  const [threeStop, setThreeStop] = useState(false);
  const [fourStop, setFourStop] = useState(false);

  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

  const [early12am, setEarly12am] = useState(
    new Date().toISOString().substring(0, 10) + "T00:00:00"
  );
  const [early8am, setEarly8am] = useState(
    new Date().toISOString().substring(0, 10) + "T08:00:00"
  );
  const [afternoon12pm, setAfternoon12pm] = useState(
    new Date().toISOString().substring(0, 10) + "T12:00:00"
  );
  const [evening4pm, setEvening4pm] = useState(
    new Date().toISOString().substring(0, 10) + "T16:00:00"
  );
  const [evening8pm, setEvening8pm] = useState(
    new Date().toISOString().substring(0, 10) + "T20:00:00"
  );

  const { airlines, isFetchingAirlines, fetchAirlinesError } = useSelector(
    (state) => state.airlineData
  );

  const { flights, isFetchingFlights, fetchFlightsError } = useSelector(
    (state) => state.flightData
  );
  const { isLogingIn, loginSuccessMessage } = useSelector(
    (state) => state.authData
  );

  useEffect(() => {
    const newDate = new Date(searchDate).toISOString().substring(0, 10);
    setEarly12am(newDate + "T00:00:00");
    setEarly8am(newDate + "T08:00:00");
    setAfternoon12pm(newDate + "T12:00:00");
    setEvening4pm(newDate + "T16:00:00");
    setEvening8pm(newDate + "T20:00:00");
  }, [searchDate]);

  useEffect(() => {
    if (searchdata) {
      dispatch(getflightsRequest({ data: JSON.parse(searchdata) }));
    } else {
      return;
    }

    return;
  }, []);

  useEffect(() => {
    if (searchdata) {
      if (
        !isLogingIn &&
        !isFetchingFlights &&
        (fetchFlightsError?.Status === 401 ||
          fetchFlightsError?.Status === 403 ||
          fetchFlightsError?.Status === 500)
      ) {
        // logout();
        return;
      } else {
        setFlightData(flights?.data);
        const newarray = flights?.data;
        if (flights?.data?.length > 0) {
          let lowestPrice = flights?.data[0].flightCombination.price.amount;
          let highestPrice = flights?.data[0].flightCombination.price.amount;

          flights?.data?.forEach(function (keyValue, index, newarray) {
            if (index > 0) {
              if (keyValue.flightCombination.price.amount < lowestPrice) {
                lowestPrice = keyValue.flightCombination.price.amount;
              }
              if (keyValue.flightCombination.price.amount > highestPrice) {
                highestPrice = keyValue.flightCombination.price.amount;
              }
            }
          });

          setMinPrice(lowestPrice);
          setMaxPrice(highestPrice);
          setPriceRange([lowestPrice, highestPrice]);
        } else {
          setMinPrice(0);
          setMaxPrice(0);
        }

        setPageCount(Math.ceil(flights?.data?.length / limit));

        const skip = (page - 1) * limit;

        setFilteredData(flights?.data?.slice(skip, skip + limit));
        return;
      }
    } else {
      return;
    }
  }, [flights]);

  console.log(
    "First Filtered Result=================================, ",
    filteredData
  );

  useEffect(() => {
    const getFilteredResults = async () => {
      let result = flightData;

      if (search.length > 0) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(({ airlineName }) =>
            airlineName.toLowerCase().includes(search.toLowerCase())
          )
        );
      }

      if (earlyMorning && !morning && !midDay && !eveningNight && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              new Date(departureTime) >= new Date(early12am) &&
              new Date(departureTime) <= new Date(early8am)
          )
        );
      }

      if (morning && !earlyMorning && !midDay && !eveningNight && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              new Date(departureTime) >= new Date(early8am) &&
              new Date(departureTime) <= new Date(afternoon12pm)
          )
        );
      }

      if (morning && earlyMorning && !midDay && !eveningNight && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am))
          )
        );
      }

      if (midDay && !morning && !earlyMorning && !eveningNight && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              new Date(departureTime) >= new Date(afternoon12pm) &&
              new Date(departureTime) <= new Date(evening4pm)
          )
        );
      }

      if (midDay && earlyMorning && !morning && !eveningNight && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am))
          )
        );
      }

      if (morning && midDay && !earlyMorning && !eveningNight && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm))
          )
        );
      }

      if (morning && earlyMorning && midDay && !eveningNight && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm))
          )
        );
      }

      if (eveningNight && !midDay && !morning && !earlyMorning && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              new Date(departureTime) >= new Date(evening4pm) &&
              new Date(departureTime) <= new Date(evening8pm)
          )
        );
      }

      if (eveningNight && earlyMorning && !midDay && !morning && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am))
          )
        );
      }

      if (morning && eveningNight && !midDay && !earlyMorning && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm))
          )
        );
      }

      if (eveningNight && midDay && !earlyMorning && !night && !morning) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm))
          )
        );
      }

      if (eveningNight && night && !midDay && !earlyMorning && !morning) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm)) ||
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am))
          )
        );
      }

      if (morning && earlyMorning && eveningNight && !midDay && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm))
          )
        );
      }

      if (night && earlyMorning && eveningNight && !midDay && !morning) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm))
          )
        );
      }

      if (!night && earlyMorning && eveningNight && midDay && !morning) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm))
          )
        );
      }

      if (night && !earlyMorning && eveningNight && !midDay && morning) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am)) ||
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm))
          )
        );
      }

      if (night && earlyMorning && eveningNight && !midDay && morning) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm)) ||
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm))
          )
        );
      }

      if (night && !earlyMorning && eveningNight && midDay && morning) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm)) ||
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm))
          )
        );
      }

      if (morning && midDay && eveningNight && !night && !earlyMorning) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm))
          )
        );
      }

      if (morning && earlyMorning && midDay && eveningNight && !night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm))
          )
        );
      }

      if (night && !morning && !earlyMorning && !midDay && !eveningNight) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              new Date(departureTime) >= new Date(evening8pm) &&
              new Date(departureTime) <= new Date(early12am)
          )
        );
      }

      if (night && earlyMorning && !morning && !midDay && !eveningNight) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am))
          )
        );
      }

      if (morning && night && !earlyMorning && !midDay && !eveningNight) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am))
          )
        );
      }

      if (night && midDay && !morning && !earlyMorning && !eveningNight) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm))
          )
        );
      }

      if (morning && earlyMorning && night && !midDay && !eveningNight) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am)) ||
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am))
          )
        );
      }

      if (morning && midDay && night && !earlyMorning && !eveningNight) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm)) ||
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am))
          )
        );
      }

      if (midDay && eveningNight && night && !morning && !earlyMorning) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm)) ||
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am))
          )
        );
      }

      if (morning && earlyMorning && midDay && night && !eveningNight) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm)) ||
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am))
          )
        );
      }

      if (morning && earlyMorning && midDay && eveningNight && night) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ departureTime }) =>
              (new Date(departureTime) >= new Date(early8am) &&
                new Date(departureTime) <= new Date(afternoon12pm)) ||
              (new Date(departureTime) >= new Date(early12am) &&
                new Date(departureTime) <= new Date(early8am)) ||
              (new Date(departureTime) >= new Date(afternoon12pm) &&
                new Date(departureTime) <= new Date(evening4pm)) ||
              (new Date(departureTime) >= new Date(evening4pm) &&
                new Date(departureTime) <= new Date(evening8pm)) ||
              (new Date(departureTime) >= new Date(evening8pm) &&
                new Date(departureTime) <= new Date(early12am))
          )
        );
      }

      if (nonStop && !oneStop && !twoStop && !threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(({ stops }) => stops == 0)
        );
      }

      if (!nonStop && oneStop && !twoStop && !threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(({ stops }) => stops == 1)
        );
      }

      if (nonStop && oneStop && !twoStop && !threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 1
          )
        );
      }

      if (!nonStop && !oneStop && twoStop && !threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(({ stops }) => stops == 2)
        );
      }

      if (nonStop && !oneStop && twoStop && !threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 2
          )
        );
      }

      if (!nonStop && oneStop && twoStop && !threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 1 || stops == 2
          )
        );
      }

      if (nonStop && oneStop && twoStop && !threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 1 || stops == 2
          )
        );
      }

      if (!nonStop && !oneStop && !twoStop && threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(({ stops }) => stops == 3)
        );
      }

      if (nonStop && !oneStop && !twoStop && threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 3
          )
        );
      }

      if (!nonStop && oneStop && !twoStop && threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 1 || stops == 3
          )
        );
      }

      if (!nonStop && !oneStop && twoStop && threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 2 || stops == 3
          )
        );
      }

      if (!nonStop && !oneStop && !twoStop && threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 3 || stops >= 4
          )
        );
      }

      if (nonStop && oneStop && !twoStop && threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 1 || stops == 3
          )
        );
      }

      if (nonStop && !oneStop && !twoStop && threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 3 || stops >= 4
          )
        );
      }

      if (nonStop && !oneStop && twoStop && threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 2 || stops == 3
          )
        );
      }

      if (!nonStop && oneStop && !twoStop && threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 1 || stops == 3 || stops >= 4
          )
        );
      }

      if (nonStop && oneStop && !twoStop && threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 1 || stops == 3 || stops >= 4
          )
        );
      }

      if (!nonStop && oneStop && twoStop && threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 1 || stops == 2 || stops == 3 || stops >= 4
          )
        );
      }

      if (!nonStop && oneStop && twoStop && threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 1 || stops == 2 || stops == 3
          )
        );
      }

      if (nonStop && oneStop && twoStop && threeStop && !fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 1 || stops == 2 || stops == 3
          )
        );
      }

      if (!nonStop && !oneStop && !twoStop && !threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(({ stops }) => stops >= 4)
        );
      }

      if (nonStop && !oneStop && !twoStop && !threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops >= 4
          )
        );
      }

      if (!nonStop && oneStop && !twoStop && !threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 1 || stops >= 4
          )
        );
      }

      if (!nonStop && !oneStop && twoStop && !threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 2 || stops >= 4
          )
        );
      }

      if (nonStop && oneStop && !twoStop && !threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 1 || stops >= 4
          )
        );
      }

      if (!nonStop && oneStop && twoStop && !threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 1 || stops == 2 || stops >= 4
          )
        );
      }

      if (!nonStop && !oneStop && twoStop && threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 2 || stops == 3 || stops >= 4
          )
        );
      }

      if (nonStop && oneStop && twoStop && !threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) => stops == 0 || stops == 1 || stops == 2 || stops >= 4
          )
        );
      }

      if (nonStop && oneStop && twoStop && threeStop && fourStop) {
        result = result.filter(({ flightCombination }) =>
          flightCombination.flightModels.some(
            ({ stops }) =>
              stops == 0 || stops == 1 || stops == 2 || stops == 3 || stops >= 4
          )
        );
      }

      result = result.filter(
        ({ flightCombination }) =>
          flightCombination.price.amount >= priceRange[0] &&
          flightCombination.price.amount <= priceRange[1]
      );

      const skip = (page - 1) * limit;
      result = result?.slice(skip, skip + limit);

      const flightsData = await result;

      setFilteredData(flightsData);
    };

    getFilteredResults();

    return function cleanup() {
      getFilteredResults();
    };
  }, [
    search,
    page,
    priceRange[0],
    priceRange[1],
    earlyMorning,
    morning,
    midDay,
    eveningNight,
    night,
    nonStop,
    oneStop,
    twoStop,
    threeStop,
    fourStop,
  ]);

  console.log("min: " + minPrice);
  console.log("max: " + maxPrice);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  useEffect(() => {
    if (
      window.sessionStorage.getItem("airlines") &&
      window.sessionStorage.getItem("airlines") !== undefined &&
      window.sessionStorage.getItem("airlines") !== "undefined"
    ) {
      setAirlineData(JSON.parse(window.sessionStorage.getItem("airlines")));
    } else {
      dispatch(getAirlinesRequest());
    }
    return;
  }, []);

  useEffect(() => {
    if (
      !window.sessionStorage.getItem("airlines") ||
      window.sessionStorage.getItem("airlines") === "" ||
      window.sessionStorage.getItem("airlines") === null ||
      window.sessionStorage.getItem("airlines") === "null" ||
      window.sessionStorage.getItem("airlines") === undefined ||
      window.sessionStorage.getItem("airlines") === "undefined"
    ) {
      if (
        !isLogingIn &&
        !isFetchingAirlines &&
        (fetchAirlinesError?.Status === 401 ||
          fetchAirlinesError?.Status === 403 ||
          fetchAirlinesError?.Status === 500)
      ) {
        // logout();
        return;
      } else {
        setAirlineData(airlines?.data);

        window.sessionStorage.setItem(
          "airlines",
          JSON.stringify(airlines?.data)
        );

        return;
      }
    }
  }, [airlines]);

  return (
    <>
      {isFetchingFlights && <Loader />}
      <div className="py-[30px] pt-0 lg:py-[60px] lg:pt-0">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 lg:col-span-4 order-2 lg:order-1">
              <div className="py-6 px-8 bg-white rounded-2xl shadow-lg">
                <h4 className="mb-0 text-2xl font-semibold"> Filter </h4>
                <div className="border-t border-dashed my-6"></div>
                {/* <SearchableAirlineSearchSelectInput
                        items={airlineData}
                        // label="Select Review Type"
                        type="text"
                        firstOptionLabel="Select a departure location"
                        name="searchAirline"
                        id="searchAirline"
                        isError={errors?.searchAirline}
                        register={register}
                        errorMessage={errors.searchAirline?.message}
                        setValue={setValue}
                        watch={watch}
                        icon="GrLocation"
                        boxRef="searchAirline"
                        inputRef="searchAirlineInput"
                        placeholder="Search by airline name"
                      /> */}
                <div className="flex items-center justify-between rounded-full border bg-[var(--bg-2)] px-5 py-3">
                  <input
                    type="text"
                    id="search-flight"
                    name="search-flight"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border-0 w-[180px] focus:outline-none"
                    placeholder="Search by airline name"
                  />
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 shrink-0 lh-1"
                  >
                    <SearchIcon />
                  </button>
                </div>

                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-xl font-medium">
                  Pricing scale
                </p>
                <CustomRangeSlider
                  value={priceRange}
                  setValue={setPriceRange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-xl font-medium">
                  Departure Time
                </p>

                <label className="ml-2">Select Date</label>
                <div className="flex items-center justify-between rounded-full border bg-[var(--bg-2)] px-5 py-3 mb-3">
                  <input
                    type="date"
                    id="searchDate"
                    mame="searchDate"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className={` bg-transparent border-0 w-[180px] focus:outline-none `}
                    placeholder="Select Date..."
                  />
                </div>

                <ul className="flex flex-col gap-3">
                  <li className="flex justify-between items-center">
                    <CheckboxCustom
                      label="Early Morning"
                      value={earlyMorning}
                      setValue={setEarlyMorning}
                    />
                    <span>12am - 8am</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <CheckboxCustom
                      label="Morning"
                      value={morning}
                      setValue={setMorning}
                    />
                    <span>8am - 12pm</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <CheckboxCustom
                      label="Mid Day"
                      value={midDay}
                      setValue={setMidDay}
                    />
                    <span>12pm - 4pm</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <CheckboxCustom
                      label="Evening Night"
                      value={eveningNight}
                      setValue={setEveningNight}
                    />
                    <span>4pm - 8pm</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <CheckboxCustom
                      label="Night"
                      value={night}
                      setValue={setNight}
                    />
                    <span>8pm - 12am</span>
                  </li>
                </ul>
                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-xl font-medium">
                  No. of Stops
                </p>

                <ul className="flex flex-col gap-2">
                  <li>
                    <CheckboxCustom
                      label="Non Stop"
                      value={nonStop}
                      setValue={setNonStop}
                    />
                  </li>
                  <li>
                    <CheckboxCustom
                      label="1 Stop"
                      value={oneStop}
                      setValue={setOneStop}
                    />
                  </li>
                  <li>
                    <CheckboxCustom
                      label="2+ Stop"
                      value={twoStop}
                      setValue={setTwoStop}
                    />
                  </li>
                  <li>
                    <CheckboxCustom
                      label="3+ Stop"
                      value={threeStop}
                      setValue={setThreeStop}
                    />
                  </li>
                  <li>
                    <CheckboxCustom
                      label="4+ Stop"
                      value={fourStop}
                      setValue={setFourStop}
                    />
                  </li>
                </ul>
                <div className="border-t border-dashed my-6"></div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8 order-1 lg:order-2">
              <div className="grid grid-cols-1 gap-4 lg:gap-6">
                {flightList.map(
                  ({
                    id,
                    arrivalTime,
                    depertureTime,
                    from,
                    img,
                    price,
                    title,
                    to,
                  }) => (
                    <div key={id} className="col-span-1">
                      <div className="md:flex bg-white border rounded-2xl mx-3 xl:mx-0">
                        <div className="flex flex-col gap-6 p-4 lg:p-6 flex-grow">
                          <div className="flex flex-col md:flex-row justify-center items-start gap-6">
                            <div className="flex w-full justify-center md:w-auto flex-col gap-3 md:gap-7 text-center md:text-start flex-grow">
                              <div className="grid place-content-center w-16 h-16 rounded-full bg-white shadow-lg mx-auto ms-md-0">
                                <Image
                                  width={52}
                                  height={27}
                                  src={img}
                                  alt="image"
                                  className=" object-fit-contain"
                                />
                              </div>
                              <p className="mb-0 font-medium">{title}</p>
                            </div>
                            <div className="flex md:flex-col justify-between gap-2 my-6 md:my-0 flex-grow w-full md:w-auto">
                              <span className="block text-primary">From</span>
                              <h4 className="mb-0 text-2xl font-semibold">
                                {depertureTime}
                              </h4>
                              <span className="block text-[var(--neutral-700)]">
                                {from}
                              </span>
                            </div>
                            <div className="flex w-full md:w-auto justify-center flex-col gap-2 text-center flex-grow">
                              <div className="grid place-content-center w-12 h-12 shadow-lg rounded-full mx-auto">
                                <div className="grid place-content-center w-10 h-10 bg-[var(--primary-light)] text-primary rounded-full">
                                  <i className="las la-plane-departure text-2xl"></i>
                                </div>
                              </div>
                              <span className="block font-medium">
                                {" "}
                                Non-stop{" "}
                              </span>
                              <span className="block clr-neutral-500">
                                02h 15 min
                              </span>
                            </div>
                            <div className="flex w-full md:w-auto md:flex-col justify-between gap-2 my-6 md:my-0 flex-grow">
                              <span className="block text-primary">To</span>
                              <h4 className="mb-0 text-2xl font-semibold">
                                {arrivalTime}
                              </h4>
                              <span className="block text-[var(--neutral-700)]">
                                {to}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-center text-center gap-3 rounded-xl bg-[#F7F7FE] p-3">
                            <p className="mb-0">
                              Airplane :
                              <span className="text-amber-700">Boeing 787</span>
                            </p>
                            <p className="text-primary">•</p>
                            <p className="mb-0">
                              Travel Class:
                              <span className="text-primary">Economy</span>
                            </p>
                          </div>
                          <div className="md:flex justify-between text-center">
                            <p className="mb-0">
                              Refundable
                              <span className="text-primary">$5 eCash</span>
                            </p>
                            <p className="mb-0 text-red-500">
                              {" "}
                              Only 10 Seat Left{" "}
                            </p>
                            <p className="mb-0"> Flight Details </p>
                          </div>
                        </div>

                        <div className="p-3 lg:p-6 xl:pt-10 xxl:pt-14 bg-[var(--bg-2)] text-center md:text-start rounded-e-2xl">
                          <p className="clr-neutral-200 line-through">$450</p>
                          <div className="flex items-center justify-center justify-content-md-start gap-2 mb-6">
                            <h2 className="mb-0 h2 text-[var(--neutral-700)]">
                              {" "}
                              ${price}
                            </h2>
                            <span className="inline-block text-sm text-primary">
                              20% OFF
                            </span>
                          </div>
                          <Link
                            href="/flight-details"
                            className="btn-outline  flex justify-center text-primary"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )}

                <div className="col-span-1">
                  <nav>
                    <ReactPaginate
                      previousLabel={
                        <div className="page-item">
                          <div className="page-link p-0 w-10 h-10 grid place-content-center lh-1 rounded-full border border-[var(--primary)] text-primary">
                            <ChevronLeftIcon className="w-5 h-5" />
                          </div>
                        </div>
                      }
                      nextLabel={
                        <div className="page-item">
                          <div className="page-link p-0 w-10 h-10 grid place-content-center lh-1 rounded-full border border-[var(--primary)] text-primary">
                            <ChevronRightIcon className="w-5 h-5" />
                          </div>
                        </div>
                      }
                      breakLabel={
                        <div className="page-link p-0 w-10 h-10 grid place-content-center lh-1 rounded-full border border-[var(--primary)] text-primary">
                          ...
                        </div>
                      }
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      onPageChange={handlePageClick}
                      containerClassName={"flex gap-3 justify-center"}
                      pageClassName={
                        "page-item page-link p-0 w-10 h-10 grid place-content-center lh-1 rounded-full border border-[var(--primary)] text-primary"
                      }
                      pageLabelClassName={
                        "page-link p-0 w-10 h-10 grid place-content-center lh-1 rounded-full border border-[var(--primary)] text-primary"
                      }
                      pageLinkClassName={"page-item"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-item"}
                      activeClassName={"bg-primary text-white"}
                    />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
