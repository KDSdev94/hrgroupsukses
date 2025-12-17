import { db } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const useVisitorTracking = () => {
  // Get device type
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

  // Get browser info
  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";

    if (ua.indexOf("Firefox") > -1) {
      browserName = "Firefox";
      browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (ua.indexOf("Chrome") > -1) {
      browserName = "Chrome";
      browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (ua.indexOf("Safari") > -1) {
      browserName = "Safari";
      browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (ua.indexOf("Edge") > -1) {
      browserName = "Edge";
      browserVersion = ua.match(/Edge\/([0-9.]+)/)?.[1] || "Unknown";
    }

    return { browserName, browserVersion };
  };

  // Get OS info
  const getOSInfo = () => {
    const ua = navigator.userAgent;
    let osName = "Unknown";

    if (ua.indexOf("Win") > -1) osName = "Windows";
    else if (ua.indexOf("Mac") > -1) osName = "MacOS";
    else if (ua.indexOf("Linux") > -1) osName = "Linux";
    else if (ua.indexOf("Android") > -1) osName = "Android";
    else if (ua.indexOf("iOS") > -1 || ua.indexOf("iPhone") > -1)
      osName = "iOS";

    return osName;
  };

  // Get location from IP (using ipapi.co - free tier)
  const getLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      return {
        country: data.country_name || "Unknown",
        countryCode: data.country_code || "Unknown",
        city: data.city || "Unknown",
        region: data.region || "Unknown",
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        ip: data.ip || "Unknown",
      };
    } catch (error) {
      console.error("Error getting location:", error);
      return {
        country: "Unknown",
        countryCode: "Unknown",
        city: "Unknown",
        region: "Unknown",
        latitude: null,
        longitude: null,
        ip: "Unknown",
      };
    }
  };

  // Track page view
  const trackPageView = async (pageName, pageUrl) => {
    try {
      const deviceType = getDeviceType();
      const { browserName, browserVersion } = getBrowserInfo();
      const osName = getOSInfo();
      const location = await getLocation();

      const visitorData = {
        pageName: pageName || document.title,
        pageUrl: pageUrl || window.location.href,
        deviceType,
        browser: browserName,
        browserVersion,
        os: osName,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language || "Unknown",
        referrer: document.referrer || "Direct",
        location: location,
        timestamp: Timestamp.now(),
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "visitors"), visitorData);
      console.log("Visitor tracked:", visitorData);
    } catch (error) {
      console.error("Error tracking visitor:", error);
    }
  };

  // Track article view
  const trackArticleView = async (articleId, articleTitle) => {
    try {
      const deviceType = getDeviceType();
      const { browserName } = getBrowserInfo();
      const location = await getLocation();

      const articleViewData = {
        articleId,
        articleTitle,
        deviceType,
        browser: browserName,
        location: location,
        timestamp: Timestamp.now(),
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "articleViews"), articleViewData);
      console.log("Article view tracked:", articleViewData);
    } catch (error) {
      console.error("Error tracking article view:", error);
    }
  };

  return {
    trackPageView,
    trackArticleView,
  };
};
