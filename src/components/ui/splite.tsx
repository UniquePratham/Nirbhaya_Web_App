'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
          <div className="text-center space-y-4">
            <div className="loader mx-auto"></div>
            <div className="text-purple-600 font-semibold">Loading 3D Experience...</div>
            <div className="text-sm text-purple-400">Preparing your safety companion</div>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onError={(error) => {
          console.warn('Spline scene failed to load:', error);
        }}
      />
    </Suspense>
  )
}