// src/App.js
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Calculator from './components/Calculator'
import CashbackChart from './components/CashbackChart'
import Disclaimer from './components/Disclaimer'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Header from './components/Header'
import Strategies from './components/Strategies'
import './styles/globals.css'

// Custom hook for animating on scroll
function useAnimateOnScroll() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView && ref.current) {
      ref.current.classList.add('is-visible')
    }
  }, [inView, ref])

  return ref
}

// Wrapper component to handle scroll animations
function AnimatedSection({ children, className = '' }) {
  const ref = useAnimateOnScroll()

  return (
    <div ref={ref} className={`animate-on-scroll ${className}`}>
      {children}
    </div>
  )
}

function App() {
  useEffect(() => {
    // Initialize animations for elements already in view
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 md:p-8 max-w-5xl md:pt-24">
        <header className="text-center mb-10 animate-on-scroll pt-16 md:pt-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            BPI Amore Cashback Maximizer
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Your interactive guide to getting the most out of your card.
          </p>
        </header>

        <main>
          <AnimatedSection>
            <CashbackChart />
          </AnimatedSection>

          <AnimatedSection>
            <Calculator />
          </AnimatedSection>

          <AnimatedSection>
            <Strategies />
          </AnimatedSection>

          <AnimatedSection>
            <FAQ />
          </AnimatedSection>

          <AnimatedSection>
            <Disclaimer />
          </AnimatedSection>
        </main>

        <AnimatedSection>
          <Footer />
        </AnimatedSection>
      </div>
    </>
  )
}

export default App
