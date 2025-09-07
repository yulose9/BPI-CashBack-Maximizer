import ReactGA from 'react-ga4'

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID

export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID)
  }
}

export const logPageView = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
    })
  }
}

export const logWebVitals = ({ id, name, value }) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.event({
      category: 'Web Vitals',
      action: name, // The name of the metric (e.g., 'LCP', 'FID', 'CLS')
      value: Math.round(name === 'CLS' ? value * 1000 : value), // Return a rounded integer value
      label: id, // A unique ID for the metric instance
      nonInteraction: true, // Prevents affecting bounce rate
    })
  }
}
