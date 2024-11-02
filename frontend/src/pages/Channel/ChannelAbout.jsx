import React from "react";
import {
  FaEnvelope,
  FaGlobe,
  FaVideo,
  FaEye,
  FaTwitter,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useChannelAbout } from "../../hooks/studio.hook";
import { ProgressBar } from "../../components";
const ChannelAbout = () => {
  const channel = useSelector((state) => state.channel.channel);
  const { data: channelAbout, isFetching } = useChannelAbout();

  const channelDetails = [
    {
      icon: FaEnvelope,
      text: `${channelAbout?.email}`,
      link: `mailto:${channelAbout?.email}`,
    },
    {
      icon: FaGlobe,
      text: `https://watchwave.imhashir.me/channel/${channelAbout?.username}`,
      link: `https://watchwave.imhashir.me/channel/${channelAbout?.username}`,
    },
    { icon: FaVideo, text: `${channelAbout?.totalVideos} Videos` },
    { icon: FaEye, text: `${channelAbout?.totalViews} Views` },
    { icon: FaTwitter, text: `${channelAbout?.totalTweets} Tweets` },
    {
      icon: FaCalendarAlt,
      text: `Joined on ${new Date(channelAbout?.createdAt).toLocaleDateString(
        "en-GB"
      )}`,
    },
  ];

  if (isFetching) return <ProgressBar />;
  return (
    <div className=" text-white p-6 rounded-lg shadow-lg max-w-md">
      {" "}
      <h2 className="text-xl font-semibold mb-4 text-[#00bcd4]">About</h2>{" "}
      <h1 className="text-3xl font-bold mb-4 text-[#00bcd4]">
        {channel?.fullName}
      </h1>
      <p className=" mb-4 text-[#00bcd4]">
        {channelAbout?.description ||
          "No description provided for this channel"}
      </p>
      <div className="space-y-3">
        {" "}
        {channelDetails.map((detail, index) => (
          <div key={index} className="flex items-center">
            {" "}
            <detail.icon className="text-[#00bcd4] mr-3 text-xl" />{" "}
            {detail.link ? (
              <Link
                to={detail.link}
                className="text-[#00bcd4] hover:text-[#00bcd4] transition duration-300"
              >
                {" "}
                {detail.text}{" "}
              </Link>
            ) : (
              <span className="text-[#00bcd4]">{detail.text}</span>
            )}{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
export default ChannelAbout;
