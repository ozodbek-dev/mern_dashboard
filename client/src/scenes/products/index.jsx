import React , {useState,useEffect} from 'react';
import {Box, Card, CardActions,CardContent,Button,Collapse,Typography,Rating,useTheme,useMediaQuery} from "@mui/material";
import {getProducts} from "../../features/admin/admin.actions";
import Header from 'components/Header'
import {useDispatch, useSelector} from "react-redux";

const Product = ({prod})=>{
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    return <Card
        sx={{
            backgroundImage:"none",
            backgroundColor: theme.palette.background.alt,
            borderRadius:".55rem"
        }}
    >
        <CardContent>
            <Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom>
                {prod.category}
            </Typography>
            <Typography variant="h5"  component="div" >
                {prod.name}
            </Typography>
            <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>
                ${Number(prod.price).toFixed(2)}
            </Typography>
            <Rating value={prod.rating} readOnly/>
            <Typography variant="body2">
                {prod.description}
            </Typography>
            <CardActions>
                <Button
                varinat="primary"
                size="small"
                onClick={()=>setIsExpanded(!isExpanded)}
                sx={{color:theme.palette.primary[400]}}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse in={isExpanded} timeout='auto' unmountOnExit sx={{color:theme.palette.neutral[300]}}>
                <CardContent>
                    <Typography>
                        id: {prod._id}
                    </Typography>
                    <Typography>
                        Supply Left: {prod.supply}
                    </Typography>
                    <Typography>
                        Yearly sales this year: {prod.yearlySalesTotal}
                    </Typography>
                    <Typography>
                        Yearly Units Sold this year: {prod.yearlyTotalSoldUnits}
                    </Typography>
                    <Typography>
                        id: {prod._id}
                    </Typography>
                </CardContent>
            </Collapse>
        </CardContent>
    </Card>
}

const Products = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getProducts())
    }, []);
    const isNonMobile = useMediaQuery("(min-width: 1000px)")
    const {products, loading,error}  = useSelector(state=>state.adminApi)
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PRODUCTS" subtitle="See your list of products."/>
                { products || !loading ? (
                    <Box
                        mt="20px"
                         display="grid"
                         gridTemplateColumns='repeat(4,minmax(0,1fr))'
                        justifyContent="space-between"
                         rowGap="20px"
                         columnGap="1.33%"
                         sx={{
                        "& >div":{
                            gridColumn:isNonMobile ? undefined:"span 4"
                        }
                    }}
                    >
                        {products?.map(prod=>(
                            <Product prod={prod} key={prod._id}/>
                        ))}
                    </Box>
                ):<Box>Loading...</Box>
            }
        </Box>
    );
};

export default Products;
