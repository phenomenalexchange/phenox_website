"use client";

import {
  IAccess,
  IAdminPanelSettings,
  IAirplay,
  IAppDownload,
  IApplestore,
  IBusinessowners,
  ICryptoTraders,
  ICurrencyBitcoin,
  ICycle,
  IDatabaseUpload,
  IEthereum,
  IFacebook,
  IFreelancers,
  IGetStarted,
  IGoogleplay,
  IHeroImage,
  IInstagram,
  ILinkedin,
  ILogo,
  ILogoTwo,
  INewsOne,
  INewsThree,
  INewsTwo,
  IPolygon,
  ISeamless,
  ISecurity,
  ITelegram,
  ITransactionRates,
  ITron,
  ITwitter,
  IUSDC,
  IUSDT,
  IWalletSec,
  IWeb3Earners,
  IWoksCrypto,
} from "@/utils/icons.utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageCard from "@/components/aboutCard"; 
import { aboutCards } from "@/utils/aboutData";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [marketTab, setMarketTab] = useState("trending");
  const [trendingData, setTrendingData] = useState<any[]>([]);
  const [gainersData, setGainersData] = useState<any[]>([]);
  const [losersData, setLosersData] = useState<any[]>([]);
  const [marketStats, setMarketStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Helper function to format time ago
  const getTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
    return `${Math.floor(seconds / 2592000)} months ago`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      try {
        // Fetch trending
        const trendingRes = await fetch(
          "https://api.coingecko.com/api/v3/search/trending",
        );
        const trendingJson = await trendingRes.json();
        const trendingList = trendingJson.coins
          .slice(0, 10)
          .map((coin: any) => ({
            id: coin.item.id,
            symbol: coin.item.symbol.toUpperCase(),
            name: coin.item.name,
            image: coin.item.large,
            price: coin.item.data?.price || 0,
            priceChangePercentage24h:
              coin.item.data?.price_change_percentage_24h?.usd || 0,
          }));
        setTrendingData(trendingList);

        // Fetch top gainers and losers
        const marketsRes = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false&price_change_percentage=24h",
        );
        const marketsJson = await marketsRes.json();

        const gainers = marketsJson
          .filter((coin: any) => coin.price_change_percentage_24h !== null)
          .sort(
            (a: any, b: any) =>
              (b.price_change_percentage_24h || 0) -
              (a.price_change_percentage_24h || 0),
          )
          .slice(0, 10)
          .map((coin: any) => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            image: coin.image,
            price: coin.current_price,
            priceChangePercentage24h: coin.price_change_percentage_24h,
          }));

        const losers = marketsJson
          .filter((coin: any) => coin.price_change_percentage_24h !== null)
          .sort(
            (a: any, b: any) =>
              (a.price_change_percentage_24h || 0) -
              (b.price_change_percentage_24h || 0),
          )
          .slice(0, 10)
          .map((coin: any) => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            image: coin.image,
            price: coin.current_price,
            priceChangePercentage24h: coin.price_change_percentage_24h,
          }));

        setGainersData(gainers);
        setLosersData(losers);

        // Fetch global market data
        const globalRes = await fetch(
          "https://api.coingecko.com/api/v3/global",
        );
        const globalJson = await globalRes.json();

        const marketCap = globalJson.data.total_market_cap.usd;
        const btcDominance = globalJson.data.btc_market_cap_percentage;
        const volume24h = globalJson.data.total_volume.usd;

        setMarketStats((prevStats: any) => {
          const marketCapChange = prevStats?.marketCap
            ? ((marketCap - prevStats.marketCap) / prevStats.marketCap) * 100
            : 0;
          const btcDominanceChange = prevStats?.btcDominance
            ? ((btcDominance - prevStats.btcDominance) /
                prevStats.btcDominance) *
              100
            : 0;
          const volume24hChange = prevStats?.volume24h
            ? ((volume24h - prevStats.volume24h) / prevStats.volume24h) * 100
            : 0;

          return {
            marketCap,
            btcDominance,
            volume24h,
            marketCapChange,
            btcDominanceChange,
            volume24hChange,
          };
        });
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCryptoNews = async () => {
      setNewsLoading(true);
      try {
        // Using CryptoPanic API for free crypto news
        const response = await fetch(
          "https://cryptopanic.com/api/v1/posts/?auth=3f8b5e2c1a9d7f4e&kind=news&limit=3",
        );
        const data = await response.json();

        if (data.results) {
          const newsItems = data.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            body: item.body,
            link: item.link,
            time: item.published_at,
            imageUrl:
              item.metadata?.image ||
              "https://via.placeholder.com/400x300?text=Crypto+News",
          }));
          setNewsData(newsItems);
        }
      } catch (error) {
        console.error("Error fetching crypto news:", error);
        // Fallback to sample data if API fails
        setNewsData([
          {
            id: 1,
            title:
              "China’s Alibaba AI Predicts the Price of XRP, Bitcoin and Ethereum by The End of 2026",
            body: "Global market volatility persists, yet when Alibaba’s AI models are fed a carefully engineered prompt, they reveal strikingly optimistic forecasts for XRP, Bitcoin, and Ethereum heading into the latter part of 2026.",
            time: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
            imageUrl: INewsOne,
          },
          {
            id: 2,
            title:
              "BlackRock Launches iShares Staked Ethereum Trust With 82% Rewards",
            body: "Investors have paid fees to hold Ethereum in ETFs for years while leaving the network’s native yield on the table, and that inefficiency disappeared this morning when BlackRock turned Ethereum into a productive asset for Wall Street by entering the staking race.",
            time: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
            imageUrl: INewsTwo,
          },
          {
            id: 3,
            title:
              "AAVE Crypto Swap Costs Nearly $50M Lost: ETH MEV Pocketed $9.9M",
            body: "Investors have paid fees to hold Ethereum in ETFs for years while leaving the network’s native yield on the table, and that inefficiency disappeared this morning when BlackRock turned Ethereum into a productive asset for Wall Street by entering the staking race.",
            time: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
            imageUrl: INewsThree,
          },
        ]);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchCryptoNews();
    const newsInterval = setInterval(fetchCryptoNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(newsInterval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans bg-primary-white">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[94%] backdrop-blur-sm bg-secondary text-primary-black px-4 py-2 rounded-4xl z-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0">
              <Image src={ILogo} alt="PhonoX" />
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[
                  "how-it-works",
                  "product",
                  "security",
                  "ecosystem",
                  "about",
                  "faq",
                ].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                      activeSection === id
                        ? "bg-accent-yellow text-primary-black"
                        : "text-primary-black hover:text-primary-white"
                    }`}
                  >
                    {id === "faq" ? "FAQ" : id.replaceAll("-", " ")}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <button onClick={() => setModalOpen(true)} className="bg-accent-yellow text-primary-black px-4 py-2 rounded-3xl font-medium hover:bg-yellow-400 transition-colors">
                Download Now
              </button>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-800-custom inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary-white hover:bg-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-sm z-10 bg-gray-900-custom">
              {["how-it-works", "product", "security", "ecosystem", "about", "faq"].map(
                (id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`block px-3 py-2 rounded-md capitalize text-base font-medium w-full text-left ${
                      activeSection === id
                        ? "bg-accent-yellow text-primary-black"
                        : "text-gray-300-custom hover:text-primary-white"
                    }`}
                  >
                    {id === "faq" ? "FAQ" : id.replaceAll("-", " ")}
                  </button>
                ),
              )}
              <button onClick={() => setModalOpen(true)} className="block bg-accent-yellow text-primary-black px-3 py-2 rounded-3xl font-medium w-full text-left hover:bg-yellow-400">
                Download Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="scroll-mt-24 min-h-screen bg-primary-white flex items-center justify-center px-4 fade-in mt-36 md:mt-44"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl text-[#000000] font-semibold mb-8">
            Skip the Delays. <br />
            Trade and Convert Crypto Instantly.
          </h1>
          <p className="text-sm md:text-4xl mb-8 text-[#A7A7BE]">
            PhenoX is a crypto-native liquidity platform that enables users to
            deposit cryptocurrency, convert between cryptocurrencies, convert
            crypto to naira, withdraw seamlessly, and securely store their
            digital assets, all in one powerful platform.
          </p>
          <div className="flex justify-center space-x-8">
            <button onClick={() => setModalOpen(true)} className="bg-accent-yellow text-primary-black  lg:px-8 px-5 py-3 rounded-4xl font-bold md:text-sm text-xs hover:bg-yellow-400 transition-colors mb-12">
              Start using PhenoX
            </button>
            <button onClick={() => scrollToSection("how-it-works")} className="bg-[#FCFCFC] border border-[#CFCFD2] text-primary-black px-5 py-3 rounded-4xl font-bold md:text-sm text-xs transition-colors mb-12">
              See how it works
            </button>
          </div>
          <div className="">
            <Image src={IHeroImage} alt="HeroImage" className="rounded-lg" />
            <p className="text-md md:text-5xl font-semibold text-[#000000] ">
              Powered by secure blockchain technology
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 max-w-3xl mx-auto">
              <Image
                src={IPolygon}
                alt="Blockchain Diagram"
                className="rounded-lg md:mt-8 lg:w-26 w-10  "
              />
              <Image
                src={IUSDC}
                alt="Blockchain Diagram"
                className="rounded-lg md:mt-8 lg:w-26 w-10 "
              />
              <Image
                src={IUSDT}
                alt="Blockchain Diagram"
                className="rounded-lg md:mt-8 lg:w-26 w-10 "
              />
              <Image
                src={IEthereum}
                alt="Blockchain Diagram"
                className="rounded-lg md:mt-8 lg:w-26 w-10 "
              />
              <Image
                src={ITron}
                alt="Blockchain Diagram"
                className="rounded-lg md:mt-8 lg:w-26 w-10 "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section id="ecosystem" className="scroll-mt-24 md:py-20 py-14 fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-5xl font-semibold text-start text-primary-black mb-12">
            Market Overview
          </h2>

          {/* Tabs */}
          <div className="flex justify-start gap-4 mb-8 flex-wrap">
            {["trending", "gainers", "losers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setMarketTab(tab)}
                className={`md:px-6 px-3 py-2 rounded-3xl text-xs md:text-xl font-semibold transition-colors ${
                  marketTab === tab
                    ? "bg-accent-yellow text-primary-black"
                    : "bg-secondary text-[#A7A7BE] hover:bg-gray-100"
                }`}
              >
                {tab === "trending" && "Trending Assets"}
                {tab === "gainers" && "Top Gainers"}
                {tab === "losers" && "Top Losers"}
              </button>
            ))}
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-12 text-gray-600-custom">
              Loading market data...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Assets 0-4 */}
              <div className="bg-primary-white rounded-lg  overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-y-2">
                    <tbody>
                      {(marketTab === "trending"
                        ? trendingData
                        : marketTab === "gainers"
                          ? gainersData
                          : losersData
                      )
                        .slice(0, 5)
                        .map((asset) => {
                          const isGaining =
                            (asset.priceChangePercentage24h || 0) >= 0;
                          return (
                            <tr
                              key={asset.id}
                              className="bg-secondary  hover:bg-gray-50 transition-colors"
                            >
                              <td className="md:px-6 px-4 py-4 rounded-l-3xl ">
                                <div className="flex items-center gap-3">
                                  {asset.image && (
                                    <img
                                      src={asset.image}
                                      alt={asset.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                  )}
                                  <div>
                                    <p className="font-semibold text-sm text-gray-900">
                                      {asset.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {asset.symbol}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="md:px-6 px-4  py-4 text-center">
                                <p className="font-semibold text-xs md:text-xl text-gray-900">
                                  $
                                  {asset.price
                                    ? asset.price.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : "N/A"}
                                </p>
                              </td>
                              <td className="md:px-6 px-4  py-4 text-right rounded-r-3xl">
                                <span
                                  className={`inline-block px-3 py-1 text-xs md:text-xl rounded-full font-semibold  ${
                                    isGaining
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {isGaining ? "+" : ""}
                                  {asset.priceChangePercentage24h
                                    ? asset.priceChangePercentage24h.toFixed(2)
                                    : "0.00"}
                                  %
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column - Assets 5-9 */}
              <div className="bg-primary-white rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-y-2">
                    <tbody>
                      {(marketTab === "trending"
                        ? trendingData
                        : marketTab === "gainers"
                          ? gainersData
                          : losersData
                      )
                        .slice(5, 10)
                        .map((asset) => {
                          const isGaining =
                            (asset.priceChangePercentage24h || 0) >= 0;
                          return (
                            <tr
                              key={asset.id}
                              className="bg-secondary  hover:bg-gray-50 transition-colors"
                            >
                              <td className="md:px-6 px-4  py-4 rounded-l-3xl ">
                                <div className="flex items-center gap-3">
                                  {asset.image && (
                                    <img
                                      src={asset.image}
                                      alt={asset.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                  )}
                                  <div>
                                    <p className="font-semibold text-sm text-gray-900">
                                      {asset.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {asset.symbol}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="md:px-6 px-4  py-4 text-center">
                                <p className="font-semibold text-gray-900 text-xs md:text-xl">
                                  $
                                  {asset.price
                                    ? asset.price.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : "N/A"}
                                </p>
                              </td>
                              <td className="md:px-6 px-4  py-4 text-right rounded-r-3xl">
                                <span
                                  className={`inline-block px-3 py-1 text-xs md:text-xl rounded-full font-semibold ${
                                    isGaining
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {isGaining ? "+" : ""}
                                  {asset.priceChangePercentage24h
                                    ? asset.priceChangePercentage24h.toFixed(2)
                                    : "0.00"}
                                  %
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          {marketStats && (
            <div className="grid grid-cols-3 md:gap-6 gap-2">
              <div className="bg-secondary md:p-6 p-3 rounded-3xl">
                <h3 className="md:text-sm text-xs font-semibold text-[#A7A7BE] mb-2">
                  Market Cap
                </h3>
                <p className="md:text-2xl text-lg font-bold text-gray-900">
                  ${(marketStats.marketCap / 1e12).toFixed(2)}T
                </p>
                <p
                  className={`md:text-sm text-xs font-semibold mt-2 ${
                    marketStats.marketCapChange >= 0
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {marketStats.marketCapChange >= 0 ? "+" : ""}
                  {marketStats.marketCapChange?.toFixed(2) ?? "0.00"}%
                </p>
              </div>
              <div className="bg-secondary md:p-6 p-3 rounded-3xl">
                <h3 className="text-sm font-semibold text-[#A7A7BE] mb-2">
                  24h Volume
                </h3>
                <p className="md:text-2xl text-lg font-bold text-gray-900">
                  ${(marketStats.volume24h / 1e9).toFixed(2)}B
                </p>
                <p
                  className={`md:text-sm text-xs font-semibold mt-2 ${
                    marketStats.volume24hChange >= 0
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {marketStats.volume24hChange >= 0 ? "+" : ""}
                  {marketStats.volume24hChange?.toFixed(2) ?? "0.00"}%
                </p>
              </div>
              <div className="bg-secondary md:p-6 p-3 rounded-3xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-[#A7A7BE]">
                      Dominance
                    </h3>
                  </div>
                </div>
                <p className="md:text-2xl text-lg font-bold text-gray-900">
                  {marketStats.btcDominance
                    ? marketStats.btcDominance.toFixed(2)
                    : "N/A"}
                  %
                </p>
                <div className="flex justify-start items-center gap-2 mt-2">
                  <Image
                    src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
                    alt="Bitcoin"
                    width={22}
                    height={22}
                    className="rounded-full"
                  />
                  <p className="text-xs text-gray-500">Bitcoin</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Getting Started */}
      <section
        id="how-it-works"
        className="scroll-mt-24 md:py-16  bg-primary-white fade-in"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl md:text-5xl font-semibold text-center text-primary-black md:mb-12 mb-6">
                Getting Started with PhenoX Takes Seconds
              </h2>
              <p className="text-md md:text-3xl text-[#A7A7BE] text-center lg:mb-8 mb-2">
                Create an account, deposit crypto, and begin converting or
                withdrawing instantly. <br /> No unnecessary friction. No
                unnecessary delays.
              </p>
            </div>
            <div className="w-full lg:w-1/2 text-center">
              <Image
                src={IGetStarted}
                alt="Phone Mockup"
                className="mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Crypto Conversion */}
      <section
        id="real-time-conversion"
        className="scroll-mt-24 py-14 text-primary-white fade-in"
      >
        <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 mx-auto px-4 text-center">
          <div className="text-center lg:text-start flex flex-col justify-center">
            <h2 className="text-2xl md:text-5xl leading-tight md:leading-14 font-semibold text-primary-black mb-10">
              Seamless Crypto Conversion with Real-Time Settlement
            </h2>
            <p className="text-md md:text-3xl text-[#A7A7BE] mb-8">
              Trade crypto-to-crypto or convert to naira in seconds — securely,
              transparently, and without delays. PhenoX provides fast execution,
              reliable liquidity, and real-time pricing designed for traders,
              earners, and businesses.
            </p>
          </div>
          <div className="text-center">
            <Image
              src={ISeamless}
              alt="Phone Mockup"
              className="mx-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section
        id="product"
        className="scroll-mt-24 pb-10 bg-primary-white fade-in"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-5xl leading-14 font-semibold  text-primary-black mb-10">
            Key Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start md:gap-8">
            <div className="">
              <Image
                src={IWoksCrypto}
                alt="Key Features"
                className="mx-auto rounded-lg lg:mb-12"
              />
            </div>
            <ul className="space-y-8 max-w-3xl lg:mt-10 md:mt-0 mt-10">
              <li className="flex gap-4 items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="bg-black w-1 h-1 rounded-full"></div>
                    <h3 className="text-lg lg:text-2xl md:text-4xl text-black font-semibold ">
                      Deposit Crypto
                    </h3>
                  </div>
                  <p className="text-[#A7A7BE] text-md md:text-2xl leading-relaxed mt-2">
                    Transfer supported cryptocurrencies into your PhenoX wallet
                    securely.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="bg-black w-1 h-1 rounded-full"></div>
                    <h3 className="text-lg lg:text-2xl md:text-4xl text-black font-semibold ">
                      Convert Instantly
                    </h3>
                  </div>
                  <p className="text-[#A7A7BE] text-md md:text-2xl leading-relaxed mt-2">
                    Exchange crypto-to-crypto or convert crypto-to-naira in real
                    time with transparent pricing.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="bg-black w-1 h-1 rounded-full"></div>
                    <h3 className="text-lg lg:text-2xl md:text-4xl text-black font-semibold ">
                      Withdraw or Store Securely
                    </h3>
                  </div>
                  <p className="text-[#A7A7BE] text-md md:text-2xl leading-relaxed mt-2">
                    Withdraw to naira, send crypto externally, or securely hold
                    your digital assets within the platform.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Wallet Control */}
      <section id="wallet-control" className="scroll-mt-24 py-8 fade-in">
        <div className="max-w-7xl mx-auto px-4">
            <div className="w-full ">
              <h2 className="text-2xl md:text-5xl font-semibold text-center text-primary-black mb-6">
                One Wallet. Total Crypto Control.
              </h2>
              <p className="text-md md:text-3xl text-[#A7A7BE] text-center mb-8">
                Store, convert, and access your digital assets anytime from a
                single secure platform. Manage your crypto portfolio
                effortlessly with instant access to liquidity when you need it
                most.
              </p>
            </div>
            <div className="w-full  text-center">
              <Image
                src={IWalletSec}
                alt="Wallet Mockup"
                className="mx-auto rounded-lg"
              />
            </div>
        </div>
      </section>

      {/* Security */}
      <section
        id="security"
        className="scroll-mt-24 md:py-20 py-10 text-primary-white fade-in"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-5xl font-semibold text-center text-primary-black mb-6">
            Security built into the foundation
          </h2>
          <p className="text-md md:text-3xl text-[#A7A7BE] text-center mb-8">
            PhenoX prioritizes asset safety, transaction integrity, and
            operational transparency at every level.
          </p>
          <div className="">
            <Image
              src={ISecurity}
              alt="Security Diagram"
              className="mx-auto rounded-lg mb-12"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            {/* Top Row */}
            <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
              <div className="flex items-center gap-3 bg-secondary px-4 py-2 rounded-3xl w-full max-w-md justify-center">
                <Image
                  src={IDatabaseUpload}
                  alt="Security Icon"
                  className="w-8 h-8"
                />
                <p className="text-[#0B0B0F] md:text-lg text-sm font-semibold">
                  Encrypted transactions
                </p>
              </div>

              <div className="flex items-center gap-3 bg-secondary px-4 py-2 rounded-3xl w-full max-w-md justify-center">
                <Image
                  src={ICurrencyBitcoin}
                  alt="Security Icon"
                  className="w-8 h-8"
                />
                <p className="text-[#0B0B0F] md:text-lg text-sm font-semibold">
                  Blockchain-verified transfers
                </p>
              </div>
            </div>

            {/* Middle Row */}
            <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
              <div className="flex items-center gap-3 bg-secondary px-4 py-2 rounded-3xl w-full max-w-md justify-center">
                <Image
                  src={IAdminPanelSettings}
                  alt="Security Icon"
                  className="w-8 h-8"
                />
                <p className="text-[#0B0B0F] md:text-lg text-sm font-semibold">
                  Multi-layer account protection
                </p>
              </div>

              <div className="flex items-center gap-3 bg-secondary px-4 py-2 rounded-3xl w-full max-w-md justify-center">
                <Image src={ICycle} alt="Security Icon" className="w-8 h-8" />
                <p className="text-[#0B0B0F] md:text-lg text-sm font-semibold">
                  Transparent rate engine
                </p>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-center w-full">
              <div className="flex items-center gap-3 bg-secondary px-4 py-2 rounded-3xl w-full max-w-md justify-center">
                <Image src={IAirplay} alt="Security Icon" className="w-8 h-8" />
                <p className="text-[#0B0B0F] md:text-lg text-sm font-semibold">
                  Continuous system monitoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Payments Vision */}
      <section
        id="global-payments"
        className="scroll-mt-24 py-8 bg-primary-white fade-in"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-5xl font-semibold text-center text-primary-black mb-6">
            Global Payments Vision
          </h2>
          <p className="text-md md:text-3xl text-[#A7A7BE] text-center mb-8">
            Connect with crypto users worldwide. Send and receive payments
            instantly across borders without traditional banking limitations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-14 z-0">
            <div className="bg-secondary  rounded-3xl relative">
              <div className="flex items-center justify-center ">
                <Image
                  src={ICryptoTraders}
                  alt="Crypto Traders"
                  className="rounded-4xl mx-auto "
                />
              </div>
              <div className="absolute left-4 top-4 bg-secondary px-3 py-1 rounded-full">
                <p className="text-sm font-semibold text-[#A7A7BE]">
                  Crypto Traders
                </p>
              </div>
            </div>
            <div className="bg-secondary rounded-3xl relative">
              <div className="flex items-center justify-center ">
                <Image
                  src={IWeb3Earners}
                  alt="Web3 Earners"
                  className="rounded-4xl mx-auto"
                />
              </div>
              <div className="absolute left-4 top-4 bg-[#FCFCFC80] px-3 py-1 rounded-full">
                <p className="text-sm font-semibold text-primary-white">
                  Web3 Earners
                </p>
              </div>
            </div>
            <div className="bg-secondary rounded-3xl relative">
              <div className="flex items-center justify-center ">
                <Image
                  src={IBusinessowners}
                  alt="Business"
                  className="rounded-4xl mx-auto"
                />
              </div>
              <div className="absolute left-4 top-4 bg-[#00000033] px-3 py-1 rounded-full">
                <p className="text-sm font-semibold text-primary-white">
                  Business
                </p>
              </div>
            </div>
            <div className="bg-secondary rounded-3xl relative">
              <div className="flex items-center justify-center ">
                <Image
                  src={IFreelancers}
                  alt="Freelancers"
                  className="rounded-4xl mx-auto"
                />
              </div>
              <div className="absolute left-4 top-4 bg-[#FCFCFC80] px-3 py-1 rounded-full">
                <p className="text-sm font-semibold text-primary-white">
                  Freelancers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Blockchain Access */}
      <section id="multi-blockchain" className="scroll-mt-24 md:py-20 py-10 fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center pt-8 hidden lg:block">
              <Image
                src={IAccess}
                alt="Blockchain Diagram"
                className="mx-auto rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-5xl font-semibold text-start text-primary-black mb-6">
                Unified access across multiple blockchains
              </h2>
              <p className="text-md md:text-3xl text-[#A7A7BE] text-start mb-8">
                PhenoX allows users to move assets across supported networks
                without managing multiple wallets or bridges.
              </p>
              <ul className="space-y-8 max-w-3xl mt-10">
                <li className="flex gap-4 items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="bg-black w-1 h-1 rounded-full"></div>
                      <h3 className="text-xl md:text-3xl text-black font-semibold ">
                        Multi Chain Support
                      </h3>
                    </div>
                    <p className="text-[#A7A7BE] text-md md:text-3xl leading-relaxed mt-2">
                      Access assets across multiple networks from one interface.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="bg-black w-1 h-1 rounded-full"></div>
                      <h3 className="text-xl md:text-3xl text-black font-semibold ">
                        Instant network switching
                      </h3>
                    </div>
                    <p className="text-[#A7A7BE] text-md md:text-3xl leading-relaxed mt-2">
                      Move between chains without friction.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="bg-black w-1 h-1 rounded-full"></div>
                      <h3 className="text-xl md:text-3xl text-black font-semibold ">
                        Built for interoperability
                      </h3>
                    </div>
                    <p className="text-[#A7A7BE] text-md md:text-3xl leading-relaxed mt-2">
                      Designed to work across the evolving blockchain ecosystem.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Rates */}
      <section
        id="transparent-rates"
        className="scroll-mt-24 pt-10  text-primary-white fade-in"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-5xl font-semibold  text-primary-black mb-6">
            Transparent Rates. No Hidden Surprises.
          </h2>
          <p className="text-md md:text-3xl text-[#A7A7BE]  mb-8">
            What you see is what you get. Clear pricing, real-time conversion
            rates, and straightforward fee structures. PhenoX is built on trust,
            speed, and transparency.
          </p>
          <div className="">
            <Image
              src={ITransactionRates}
              alt="Transaction rate Diagram"
              className="mx-auto rounded-lg mb-12"
            />
          </div>
        </div>
      </section>

      {/* about phenominal giants */}
      <section
        id="about"
        className="scroll-mt-24 pb-20  text-primary-white fade-in"
      >
        <div className="max-w-7xl mx-auto px-4 text-center z-0">
          <h2 className="text-2xl md:text-5xl font-semibold  text-primary-black mb-6">
            Backed by Phenomenal Giants Ltd
          </h2>
          <p className="text-md md:text-3xl text-[#A7A7BE]  mb-8">
            PhenoX is built and operated by Phenomenal Giants Ltd, a registered private limited liability company incorporated in Nigeria. As a company, we operate across digital solutions, value exchange services, and consumer-focused platforms, building products designed for trust, speed, and everyday utility.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 z-0">
            {aboutCards.map((card, index) => (
              <ImageCard key={index} {...card} />
            ))}
          </div>

        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="scroll-mt-24 pt-10 fade-in">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-5xl font-semibold  text-primary-black mb-6">
            Switching is easier than you think
          </h2>
          <p className="text-md md:text-3xl text-[#A7A7BE]  mb-8">
            Getting started with PhenoX takes minutes. Download the app, create
            an account, and experience seamless crypto trading and conversion
            today.
          </p>
          <div className="flex justify-center space-x-8 mt-14">
            <div onClick={() => setModalOpen(true)}  className="font-bold cursor-pointer hover:bg-gray-800-custom transition-colors">
              <Image src={IGoogleplay} alt="Google Play Store" />
            </div>
            <div onClick={() => setModalOpen(true)}  className="font-bold cursor-pointer hover:bg-gray-800-custom transition-colors">
              <Image src={IApplestore} alt="App Store" />
            </div>
          </div>
          <div className="mt-12">
            <Image
              src={IAppDownload}
              alt="Download Diagram"
              className="mx-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Crypto News */}
      <section
        id="crypto-news"
        className="scroll-mt-24 py-20 bg-primary-white fade-in"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-semibold text-start text-primary-black mb-12">
            Crypto News
          </h2>
          {newsLoading ? (
            <div className="text-center py-12 text-gray-600-custom">
              Loading crypto news...
            </div>
          ) : (
            <div className="space-y-6">
              {newsData.map((article) => {
                const timeAgo = getTimeAgo(article.time);
                return (
                  <div key={article.id} className="flex flex-col md:flex-row gap-6 items-stretch">
                    <div className="shrink-0 w-full md:w-96">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        className="object-cover rounded-3xl w-full h-56 md:h-full"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl md:text-4xl font-semibold text-primary-black mb-3">
                          {article.title}
                        </h3>
                        <p className="text-[#A7A7BE] text-md mb-4 line-clamp-2">
                          {article.body ||
                            article.description ||
                            "Read more about this news..."}
                        </p>
                      </div>
                      <div className="flex justify-end items-center mt-4">
                        <span className="text-sm text-end w-fit text-[#0B0B0F] bg-secondary px-4 py-2 rounded-3xl mb-4 mr-4">
                          {timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-24 pb-14 fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-5xl font-semibold text-center  text-primary-black mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-secondary p-6 rounded-3xl mb-2 group">
              <summary className="font-semibold text-[#0B0B0F] cursor-pointer flex justify-between items-center list-none">
                <span className="lg:text-lg text-xs ">Is PhenoX secure?</span>
                <svg
                  className="w-5 h-5 transition-transform duration-200 border-2 rounded-full group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 lg:text-lg text-sm text-[#A7A7BE]">
                Yes. PhenoX uses encrypted transactions, blockchain
                verification, and multi-layer security protocols to safeguard
                user assets and activity.
              </p>
            </details>
            <details className="bg-secondary p-6 rounded-3xl mb-2 group">
              <summary className="font-semibold text-[#0B0B0F] cursor-pointer flex justify-between items-center list-none">
                <span className="lg:text-lg text-xs ">Which networks are supported?</span>
                <svg
                  className="w-5 h-5 transition-transform duration-200 border-2 rounded-full group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 lg:text-lg text-sm text-[#A7A7BE]">
                PhenoX supports major cryptocurrencies across selected
                blockchain networks. A full list of supported assets and
                networks is available within the app.
              </p>
            </details>
            <details className="bg-secondary p-6 rounded-3xl mb-2 group">
              <summary className="font-semibold text-[#0B0B0F] cursor-pointer flex justify-between items-center list-none">
                <span className="lg:text-lg text-xs ">
                  How fast are crypto conversions and naira withdrawals?
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-200 border-2 rounded-full group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 lg:text-lg text-sm text-[#A7A7BE]">
                Crypto conversions are processed instantly. Naira withdrawals
                are processed promptly depending on network and banking
                settlement conditions.
              </p>
            </details>
            <details className="bg-secondary p-6 rounded-3xl mb-2 group">
              <summary className="font-semibold text-[#0B0B0F] cursor-pointer flex justify-between items-center list-none">
                <span className="lg:text-lg text-xs ">Are there transaction fees or conversion fees?</span>
                <svg
                  className="w-5 h-5 transition-transform duration-200 border-2 rounded-full group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 lg:text-lg text-sm text-[#A7A7BE]">
                Yes. PhenoX maintains transparent and competitive fee structures, clearly displayed before transaction confirmation.
              </p>
            </details>
            <details className="bg-secondary p-6 rounded-3xl mb-2 group">
              <summary className="font-semibold text-[#0B0B0F] cursor-pointer flex justify-between items-center list-none">
                <span className="lg:text-lg text-xs ">Can I store my crypto with PhenoX?</span>
                <svg
                  className="w-5 h-5 transition-transform duration-200 border-2 rounded-full group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 lg:text-lg text-sm text-[#A7A7BE]">
                Yes. Users can securely hold supported cryptocurrencies within
                their PhenoX wallet and access them anytime for conversion or
                withdrawal.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-black text-primary-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col justify-between items-center gap-6">
            <div className="flex flex-col justify-center">
              <Image src={ILogoTwo} alt="PhonoX" className="w-3/5 m-auto" />
            </div>
            <div>
              <div className="flex space-x-4">
                <a
                  href="https://t.me/PhenomenalGiants"
                  className="text-gray-400-custom hover:text-primary-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={ITelegram}
                    alt="Telegram"
                    className="w-8 h-8"
                  />
                </a>
                <a
                  href="https://www.instagram.com/phenomenal_exchange"
                  className="text-gray-400-custom hover:text-primary-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 <Image
                    src={IInstagram}
                    alt="Instagram"
                    className="w-8 h-8"
                  />
                </a>
                <a
                  href="https://www.facebook.com/PhenomenalExchange"
                  className="text-gray-400-custom hover:text-primary-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={IFacebook}
                    alt="LinkedIn"
                    className="w-8 h-8"
                  />
                </a>
                <a
                  href="https://x.com/phenox_01"
                  className="text-gray-400-custom hover:text-primary-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={ITwitter}
                    alt="Twitter"
                    className="w-8 h-8"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className=" mt-4 pt-8 text-center text-gray-400-custom">
            <p>&copy; 2026 Phenomenal Giants Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Coming Soon Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md mx-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Coming Soon</h2>
            <p className="text-gray-600 mb-6 text-center">
              This feature is coming soon. Stay tuned for updates!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-accent-yellow text-primary-black px-6 py-2 rounded-4xl font-bold hover:bg-yellow-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 cursor-pointer right-8 bg-accent-yellow text-primary-black p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 z-40 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
