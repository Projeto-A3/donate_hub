import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonAnimation: React.FC = () => {
  return (
    <div className="card-donation shadow mb-4">
      <p>
        <Skeleton className="mb-1 mr-2" width={`20%`} height={20} count={2} />
      </p>
      <p>
        <Skeleton className="mr-2" width={`20%`} height={20} />
        <Skeleton className="mb-1" width={`80%`} height={20} />
      </p>
      <p>
        <Skeleton className="mb-1 mr-2" width={`20%`} height={20} count={2} />
        <span className="d-block">
          <Skeleton className="mb-1 mr-2" width={`20%`} height={20} count={2} />
        </span>
      </p>
    </div>
  )
}

export default SkeletonAnimation
