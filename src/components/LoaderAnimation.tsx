import { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';
const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export const LoaderAnimation: React.FC<{isLoading:true}> = ({isLoading})=>{
  return(
    <div className='flex justify-center items-center py-20'>
      <ClipLoader
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}