import { Grid, Typography } from '@mui/material';
import useClothes from '../hooks/api/useClothes'
import ClothesGrid from "./ClothesGrid";
import Filters from './Filters';
import { FiltersContext } from '../context/FiltersContext'
import { Suspense, useState } from 'react';
import CenteredCircularProgress from './CenteredCircularProgress'
import { useSearchParams } from 'react-router-dom'


let suspense = false
const ClothesPage = () => {
    const [selectedColors, setSelectedColors] = useState([])
    const [selectedSizes, setSelectedSizes] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    const [searchParams] = useSearchParams()
    const gender = searchParams.get('gender')

    const { data: clothes, isLoading } = useClothes({
        gender,
        colors: selectedColors,
        sizes: selectedSizes,
        categories: selectedCategories,
    }, suspense)


    return (
        <FiltersContext.Provider
            value={{
                selectedColors, setSelectedColors,
                selectedSizes, setSelectedSizes,
                selectedCategories, setSelectedCategories,
            }}>
            <Grid
                container
                spacing={4}
                sx={{ mt: 2 }}
            >
                <Grid item xs={12} sm={8} md={9}>
                    {isLoading ?
                        <CenteredCircularProgress />
                        :
                        clothes.length > 0 ?
                            <ClothesGrid clothes={clothes} />
                            :
                            <Typography variant='h6'> No such clothes found </Typography>
                    }
                </Grid>

                <Grid item xs={0} sm={4} md={3}>
                    <Suspense fallback={<></>}>
                        <Filters />
                    </Suspense>
                </Grid>
            </Grid>
        </FiltersContext.Provider>
    );
}

export default ClothesPage;
