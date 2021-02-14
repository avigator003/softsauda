import React, { Component, useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Button, ActivityIndicator, Dimensions } from 'react-native';
import { Form, Input, Label, Item } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchableDropdown from 'react-native-searchable-dropdown';
import SelectTwo from '../components/SelectTwo'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import moment from 'moment'
import { number } from 'prop-types';
import Toast from 'react-native-simple-toast';
import * as Updates from 'expo-updates'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../responsiveLayout/ResponsiveLayout'
import theme1 from '../components/styles/DarkTheme' 
const { width, height } = Dimensions.get('window')

function Dealer({ navigation, route }) {
    let rout = ""
    if (typeof (route.params) == 'undefined') {
        rout = "none"
    }
    else {
        rout = route.params.routing
    }

    const [dealNumberOne, setDealNumberOne] = useState()
    const [dealNumberTwo, setDealNumberTwo] = useState()

    const [selectedBuyerItems, setSelectedBuyerItems] = useState([])
    const [selectedSellerItems, setSelectedSellerItems] = useState([])
    const [selectedBrokerItems, setSelectedBrokerItems] = useState([])
    const [selectedProductItems, setSelectedProductItems] = useState([])
    const [selectedBrandItems, setSelectedBrandItems] = useState([])

    const [buyerId, setBuyerId] = useState();
    const [selllerId, setSellerId] = useState();
    const [brokerId, serBrokerId] = useState();
    const [productId, setProductId] = useState();
    const [brandId, setBrandId] = useState();


    const [date, setDate] = useState();
    const [billDate, setBillDate] = useState();

    const [buyerItems, setBuyerItems] = useState([])
    const [sellerItems, setSellerItems] = useState([])
    const [brokeritems, setBrokerItems] = useState([])
    const [productItems, setProductItems] = useState([])
    const [brandItems, setBrandItems] = useState([])

    const [brokerType, setBrokerType] = useState()
    const [packItems, setPackItems] = useState([])
    const [packValue, setpackvalue] = useState()
    const [weight, setWeight] = useState()

    const [loading, setLoading] = useState(false)
    const [contract_sauda_group, setProductList] = useState([{ p_code: "", bag: "", pck: "", sd_rate: "", slbrk_rt: "", brbrk_rt: "", amount: "", wght: "", brbrk_typ: "", slbrk_type: "", brbrk_amt: "", slbrk_amt: "" }])

    const [buyerBrokerage, setBuyerBrokerage] = useState()
    const [sellerBrokerage, setSellerBrokerage] = useState()
    const [buyerBrokerageType, setBuyerBrokerageType] = useState()
    const [sellerBrokerageType, setSellerBrokerageType] = useState()
    const [buyerBrokerageAmount, setBuyerBrokerageAmount] = useState()
    const [sellerBrokerageAmount, setSellerBrokerageAmount] = useState()

    const [bag, setBag] = useState()
    const [amount, setAmount] = useState()
    const [rate, setRate] = useState()

    const [productRemarks, setProductRemarks] = useState()
    const [disabled, setDisabled] = useState(true)

    const [show, setShow] = useState(true)
    const [show1, setShow1] = useState(true)
    // Refs

    const dealOneRef = useRef()
    const dealTwoRef = useRef()
    const remarksRef = useRef()
    const billNumberRef = useRef()
    const bagRefs = useRef([])
    const rateRef = useRef([])
    const amountRef = useRef([])
    const buyerBrokerageRef = useRef([])
    const sellerBrokerageRef = useRef([])
    const productRemarksRef = useRef([])
    const dateRef = useRef()



    //OnFocus

    const onFocusChange = (name, i) => {
        if (name == "dealOne") {

            dealOneRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "dealTwo") {
            dealTwoRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "remarks") {
            remarksRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "billNumber") {
            billNumberRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "bag") {
            (bagRefs.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "rate") {
            (rateRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "amount") {
            (amountRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "buyerBrokerage") {
            (buyerBrokerageRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "sellerBrokerage") {
            (sellerBrokerageRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "productRemarks") {
            (productRemarksRef.current)[i].setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }

    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            let todayDate = moment(new Date()).format("DD/MM/YYYY")

            setDate(todayDate)

        })
        return unsubscribe;
    }, [navigation])

    const onBlurChange = (name, i) => {

        if (name == "dealOne") {
            dealOneRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "dealTwo") {

            dealTwoRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "remarks") {
            remarksRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "billNumber") {
            billNumberRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "bag") {

            (bagRefs.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "rate") {
            (rateRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "amount") {
            (amountRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "buyerBrokerage") {
            (buyerBrokerageRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "sellerBrokerage") {
            (sellerBrokerageRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "productRemarks") {
            (productRemarksRef.current)[i].setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
    }



    // Functions
    const handleBuyerId = (item) => {
      
        setBuyerId(item.id)
    }

    const handleSellerId = (item) => {
      
        setSellerId(item.id)
    }
    const handleBrokerId = (item) => {
       
        setBrokerId(item.id)
    }

    const handleProductId = (id, product, index) => {
        setProductId(id)

        const URL = `http://www.softsauda.com/deal_entry/getprdtlist?productid=${id}`
        axios.get(URL)
            .then(response => {
                const array = []
                response.data.product_mast.product_mast_group.map(data => (

                    console.log(data, "data"),
                    array.push({ label: data.it_pck, value: data.it_pck })

                ))
                setPackItems(array)

                product.pck = array[0].value
                setpackvalue(product.pck)
                product.brbrk_rt = response.data.product_mast.product_mast_group[0].it_ratebr
                setBuyerBrokerage(product.brbrk_rt)
                product.slbrk_rt = response.data.product_mast.product_mast_group[0].it_ratesl
                setSellerBrokerage(product.slbrk_rt)

                product.brbrk_typ = response.data.product_mast.product_mast_group[0].it_ratetypbr
                setBuyerBrokerageType(product.brbrk_typ)

                product.slbrk_type = response.data.product_mast.product_mast_group[0].it_ratetypsl
                setSellerBrokerageType(product.slbrk_type)


                const list = [...contract_sauda_group];

                list[index]["p_code"] = id;
                list[index]["brbrk_rt"] = product.brbrk_rt;
                list[index]["slbrk_rt"] = product.slbrk_rt;
                list[index]["brbrk_typ"] = product.brbrk_typ;
                list[index]["slbrk_type"] = product.slbrk_type;
                setProductList(list);

            })

    }

    const handleBrandId = (id) => {
        setBrandId(id)
    }

    useEffect(() => {
        let isCancelled = false;
        console.log(AsyncStorage.getItem("masterid"))
        //Buyers List
        const getBuyers = async () => {
            const masterid = await AsyncStorage.getItem("masterid")
            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            await fetch(`http://www.softsauda.com/deal_entry/party_listB?ptyp=B&masterid=${masterid}`, data)
                .then(response => response.json())
                .then(data => {
                    console.log("hey",data.results)
                    data.results.map(dat => (
                        setBuyerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name }])

                    ))
                })
            getSellers()
        }



        getBuyers();
        return () => {
            isCancelled = true;
        };
    }, [])

    //Seller List
    const getSellers = async () => {
        const masterid = await AsyncStorage.getItem("masterid")
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(`http://www.softsauda.com/deal_entry/party_listS?ptyp=S&masterid=${masterid}`, data)

            .then(response => response.json())
            .then(data => {

                data.results.map(dat => (
                    setSellerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name }])
                ))
            })

        getBrokers()
    }

    //Sub Brokers List
    const getBrokers = async () => {

        const masterid = await AsyncStorage.getItem("masterid")
        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(`http://www.softsauda.com/deal_entry/party_subbroker?masterid=${masterid}`, data)

            .then(response => response.json())
            .then(data => {

                data.results.map(dat => (
                    setBrokerItems(oldArray => [...oldArray, { id: dat.id, name: dat.party_name }])

                ))
            })
        getProducts()

    }

    // Product List
    const getProducts = async () => {

        const masterid = await AsyncStorage.getItem("masterid")
        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(`http://www.softsauda.com/deal_entry/Product_list?masterid=${masterid}`, data)

            .then(response => response.json())
            .then(data => {
                data.results.map(dat => (

                    setProductItems(oldArray => [...oldArray, { id: dat.id, name: dat.product_name }])

                ))
            })
        getBrands()
    }

    //Brand List 
    const getBrands = async () => {

        const masterid = await AsyncStorage.getItem("masterid")
        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        await fetch(`http://www.softsauda.com/deal_entry/Brand_list?masterid=${masterid}`, data)

            .then(response => response.json())
            .then(data => {

                data.results.map(dat => (

                    setBrandItems(oldArray => [...oldArray, { id: dat.id, name: dat.brand_name }])

                ))
            })
        setLoading(true)
    }



    // Change Product
    const handleProductDetails = (value, index, name, product) => {

        if (name == "bag") {
            setBag(value);
        }

        else if (name == "pck") {
            setpackvalue(value)
        }
        else if (name == "sd_rate") {
            setRate(value)
        }
        else if (name == "brbrk_rt") {
            setBuyerBrokerage(value)
        } else if (name == "slbrk_rt") {
            setSellerBrokerage(value)
        }

        else if (name == "amount") {
            setAmount(value)
        }
        const list = [...contract_sauda_group];
        list[index][name] = value;


        var weight = ((parseInt(list[index]["pck"])) * (parseInt(list[index]["bag"]))) / 100
        setWeight(weight)
        list[index]["wght"] = weight

        var total = ((parseInt(list[index]["pck"]) * (parseInt(list[index]["sd_rate"])) * (parseInt(list[index]["bag"]))) / 100).toString();

        if (isNaN(total)) {
            setAmount(value)

            list[index]["amount"] = value;
        }
        else if (!isNaN(total) && value != list[index]["amount"]) {
            setAmount(total)
            list[index]["amount"] = total;
        }

        var bamt
        var samt
        //Buyer Brokerage Amount
        if (list[index]["brbrk_typ"] == 'PQtl')
            bamt = parseInt(list[index]["brbrk_rt"]) * parseInt(list[index]["wght"])

        if (list[index]["brbrk_typ"] == 'PBag')
            bamt = parseInt(list[index]["brbrk_rt"]) * parseInt(list[index]["bag"])

        if (list[index]["brbrk_typ"] == '%')
            bamt = (parseInt(list[index]["amount"]) * 100) / parseInt(list[index]["brbrk_rt"])

        if (list[index]["brbrk_typ"] == 'Fix')
            bamt = list[index]["brbrk_rt"]


        //Seller Brokerage Amount
        if (list[index]["slbrk_type"] == 'PQtl')
            samt = parseInt(list[index]["slbrk_rt"]) * parseInt(list[index]["wght"])

        if (list[index]["slbrk_type"] == 'PBag')
            samt = parseInt(list[index]["slbrk_rt"]) * parseInt(list[index]["bag"])

        if (list[index]["slbrk_type"] == '%')
            samt = (parseInt(list[index]["amount"]) * 100) / parseInt(list[index]["slbrk_rt"])

        if (list[index]["slbrk_type"] == 'Fix')
            samt = list[index]["slbrk_rt"]



        setBuyerBrokerageAmount(bamt)
        setSellerBrokerageAmount(samt)
        list[index]["slbrk_amt"] = samt
        list[index]["brbrk_amt"] = bamt

        setProductList(list);

    };

    // Add Product

    const handleProductClick = (i) => {

        setProductList([...contract_sauda_group, { p_code: "", bag: "", pck: "", sd_rate: "", slbrk_rt: "", brbrk_rt: "", amount: "", wght: "", brbrk_typ: "", slbrk_type: "", brbrk_amt: "", slbrk_amt: "" }]);

    }

    //Remove Product

    const handleRemoveClick = index => {
        const list = [...contract_sauda_group];
        list.splice(index, 1);
        setProductList(list);
    };

    // Submit Details
    const handleSubmit = () => {
        const submitData = async () => {
            axios({
                method: 'POST',
                url: "http://www.softsauda.com/deal_entry/submit",
                data: {
                    sd_date: date,
                    br_code: buyerId,
                    sbtype: '',
                    sl_code: selllerId,
                    co_code: await AsyncStorage.getItem("companyCode"),
                    div_code: await AsyncStorage.getItem("divisionCode"),
                    masterid: await AsyncStorage.getItem("masterid"),
                    deal_subbrokers: '',
                    main_bk: "DE",
                    c_j_s_p: "MDE",
                    bno: '',
                    pono: '',
                    vouc_code: 0,
                    usrnm: "demo",
                    contract_sauda_group: contract_sauda_group
                }
            })
                .then(respone => {
                    console.log(respone)
                    Toast.showWithGravity('Data Submitted.', Toast.LONG, Toast.BOTTOM);
                    Updates.reloadAsync()
                })
        }
        submitData()

    }

    useEffect(() => {
        if (typeof (buyerId) !== "undefined" && typeof (selllerId) !== "undefined") {
            var count = 0;
            console.log(contract_sauda_group)
            for (var i = 0; i < contract_sauda_group.length; i++) {
                if (contract_sauda_group[i].p_code !== "" && contract_sauda_group[i].bag !== "" && contract_sauda_group[i].rate !== "") {
                    count++;
                }
            }
            console.log(count, "count")
            if (count == contract_sauda_group.length) {

                setDisabled(false)
            }
            else {
                setDisabled(true)
            }
        }


    }, [buyerId, selllerId, contract_sauda_group])

    //Handle Show less and More


    return (
        <>
            {loading ? (
                <>

                    <ScrollView keyboardShouldPersistTaps='always' style={styles.container}>
                        <Form style={styles.form}>

                            <View style={[styles.column, { top: 12 }]}>
                                <TextInput
                                    style={[styles.input, { backgroundColor: "#D3FD7A" }]}
                                    placeholder="Deal No."
                                    ref={dealOneRef}
                                    onFocus={() => onFocusChange("dealOne")}
                                    onBlur={() => onBlurChange("dealOne")}
                                    defaultValue={dealNumberOne}
                                    onChangeText={text => setDealNumberOne(text)}
                                    onSubmitEditing={() => dealTwoRef.current.focus()}
                                />



                                <TextInput
                                    keyboardType="numeric"
                                    style={[styles.input, { backgroundColor: "#D3FD7A" }]}
                                    placeholder="Deal No."
                                    onFocus={() => onFocusChange("dealTwo")}
                                    onBlur={() => onBlurChange("dealTwo")}
                                    ref={dealTwoRef}
                                    defaultValue={dealNumberTwo}
                                    onChangeText={text => setDealNumberTwo(text)}



                                />
                                <DatePicker

                                    style={{ width: wp('40%'), borderRadius: 5, margin: 10 }}
                                    date={date}
                                    mode="date"
                                    placeholder="Date"
                                    format="DD/MM/YYYY"

                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 1000,
                                            top: 4,
                                            marginLeft: 0,

                                        },
                                        dateInput: {
                                            borderRadius: 10,
                                            marginBottom: 12,
                                            marginRight: 15,
                                            height: 35

                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {
                                        setDate(date)
                                    }}
                                />

                            </View>
                            <View style={styles.column}>
                                <SelectTwo items={buyerItems} selectedItem={selectedBuyerItems} handleId={handleBuyerId} width={wp('80%')} placeholder="Buyer" borderColor="#ccc" />
                            </View>
                            <View style={styles.column}>
                                <SelectTwo items={sellerItems} selectedItem={selectedSellerItems} handleId={handleSellerId} width={wp('80%')} placeholder="Seller" borderColor="#ccc"/>
                            </View>
                            {
                                brokeritems.length == 0 ? (<></>) : (
                                    <View style={styles.column}>
                                        <SelectTwo items={brokeritems} selectedItem={selectedBrokerItems} width={wp('37%')} handleId={handleBrokerId} placeholder="Broker" borderColor="#ccc"/>
                                        <DropDownPicker
                                            items={[
                                                { label: 'Buyer', value: 'B', hidden: true },
                                                { label: 'Seller', value: 'S' },
                                            ]}

                                            containerStyle={{
                                                height: 35,
                                                width: wp('37%'),
                                                top: 4,
                                                marginLeft: 10,
                                                flex: 1
                                                 }}
                                            style={{
                                                backgroundColor: 'transparent'
                                            }}
                                            itemStyle={{
                                            }}
                                            dropDownStyle={{ backgroundColor: '#fafafa', width: wp('37%'), marginTop: 0 ,position:"absolute",zIndex:20}}
                                            onChangeItem={item => setBrokerType(item.value)}
                                            placeholder="Select"
                                        />
                                    </View>
                                )}

                            <View style={{ left: 10 }}>
                                {show ?
                                    <TouchableOpacity onPress={() => setShow(!show)} style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ color: "grey", fontSize: 10 }}>Show More</Text>
                                        <Icon name="caret-down" size={wp("4%")} color="black" style={{ top: -2, left: 4 }} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => setShow(!show)} style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ color: "grey", fontSize: 10 }}>Show Less</Text>
                                        <Icon name="caret-up" size={wp("4%")} color="black" style={{ top: -2, left: 4 }} />

                                    </TouchableOpacity>
                                }
                            </View>

                            {
                                !show ?
                                    <>
                                        <View style={styles.column}>
                                            <TextInput
                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('82%'), flex: 0.97 }]}
                                                placeholder="Remarks"
                                                onFocus={() => onFocusChange("remarks")}
                                                onBlur={() => onBlurChange("remarks")}
                                                ref={remarksRef}
                                                onSubmitEditing={() => billNumberRef.current.focus()}

                                            />
                                        </View>

                                        <View style={styles.column}>
                                            <TextInput
                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('48%') }]}
                                                placeholder="Bill Number"
                                                onFocus={() => onFocusChange("billNumber")}
                                                onBlur={() => onBlurChange("billNumber")}
                                                ref={billNumberRef}
                                                onSubmitEditing={() => bagRefs.current[0].focus()}
                                            />


                                            <DatePicker
                                                style={{ width: wp('38%'), borderRadius: 5, margin: 10 }}
                                                date={billDate}
                                                mode="date"
                                                placeholder="Bill date"
                                                format="DD/MM/YYYY"
                                                defa
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                customStyles={{
                                                    dateIcon: {
                                                        position: 'absolute',
                                                        left: 360,
                                                        top: 4,
                                                        marginLeft: 0,

                                                    },
                                                    dateInput: {
                                                        borderRadius: 10,
                                                        marginBottom: 12,
                                                        marginRight: 15,
                                                        height: 35

                                                    }
                                                    // ... You can check the source to find the other keys.
                                                }}
                                                onDateChange={(date) => { setBillDate(date) }}
                                            />
                                        </View >

                                    </> : <></>
                            }


           <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, marginTop:5 }} />
                                         
                            {/* Product Details*/}
                            <View style={{ marginTop: 30 }}>

                                {
                                    contract_sauda_group.map((x, i) => (
                                        <View style={styles.card}>
                                            
                                            <View style={styles.column}>

                                                <SelectTwo items={productItems} name="p_code"
                                                    selectedItem={selectedProductItems}
                                                    handleId={handleProductId} handleProduct={handleProductDetails}
                                                    width={wp('37%')} placeholder="Product" i={i}
                                                    defaultValue={x.p_code} product={x} borderColor="#ccc" />

                                                <SelectTwo items={brandItems} name="brand"
                                                    selectedItem={selectedBrandItems} handleId={handleBrandId}
                                                    handleProduct={handleProductDetails} width={wp('37%')}
                                                    placeholder="Brand" i={i} defaultValue="brand" borderColor="#ccc" />

                                            </View>

                                            <View style={styles.column}>
                                                <TextInput
                                                    keyboardType="numeric"
                                                    name="bag"
                                                    style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37%'), flex: 0.90 }]}
                                                    placeholder="Bag"
                                                    onFocus={() => onFocusChange("bag", i)}
                                                    onBlur={() => onBlurChange("bag", i)}
                                                    ref={(element) => bagRefs.current[i] = element}
                                                    defaultValue={x.bag}
                                                    onChangeText={value => handleProductDetails(value, i, "bag")}
                                                    onSubmitEditing={() => rateRef.current[i].focus()}

                                                />

                                                <DropDownPicker
                                                    items={packItems}
                                                    defaultValue={x.pck}
                                                    containerStyle={{
                                                        height: 35,
                                                        width: wp('37%'),

                                                        top: 4,
                                                        marginLeft: 10,
                                                        flex: 1
                                                    }}
                                                    style={{
                                                        backgroundColor: 'transparent'
                                                    }}
                                                    itemStyle={{
                                                    }}
                                                    dropDownStyle={{ backgroundColor: '#fafafa', width: wp('37%'), marginTop: 5 }}
                                                    onChangeItem={(item) => handleProductDetails(item.value, i, "pck")}
                                                    name="pck"
                                                    placeholder="Pack"
                                                    style={{ left: -5, backgroundColor: "transparent" }}
                                                />
                                             </View>
                                             <View style={styles.column}>
                                      
                                                <TextInput
                                                    keyboardType="numeric"
                                                    style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37.5%') }]}
                                                    placeholder="Rate"
                                                    name="sd_rate"
                                                    defaultValue={x.rate}
                                                    onChangeText={text => handleProductDetails(text, i, "sd_rate")}
                                                    onFocus={() => onFocusChange("rate", i)}
                                                    onBlur={() => onBlurChange("rate", i)}
                                                    ref={(element) => rateRef.current[i] = element}
                                                    onSubmitEditing={() => amountRef.current[i].focus()}

                                                />

                                                <TextInput
                                                    keyboardType="numeric"
                                                    style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37%') }]}
                                                    name="amount"
                                                    placeholder="Amount"
                                                    defaultValue={isNaN(x.amount) ? "0" : x.amount}
                                                    onChangeText={text => handleProductDetails(text, i, "amount")}
                                                    onFocus={() => onFocusChange("amount", i)}
                                                    onBlur={() => onBlurChange("amount", i)}
                                                    ref={(element) => amountRef.current[i] = element}

                                                />

                                            </View>

                                            <View style={{ left: 10 }}>
                                                {show1 ?
                                                    <TouchableOpacity onPress={() => setShow1(!show1)} style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ color: "grey", fontSize: 10 }}>Show More</Text>
                                                        <Icon name="caret-down" size={wp("4%")} color="black" style={{ top: -2, left: 4 }} />
                                                    </TouchableOpacity> :
                                                    <TouchableOpacity onPress={() => setShow1(!show1)} style={{ display: "flex", flexDirection: "row" }}>
                                                        <Text style={{ color: "grey", fontSize: 10 }}>Show Less</Text>
                                                        <Icon name="caret-up" size={wp("4%")} color="black" style={{ top: -2, left: 4 }} />

                                                    </TouchableOpacity>
                                                }
                                            </View>
                                            {
                                                !show1 ?
                                                    <>
                                                        <View style={styles.column}>
                                                            <TextInput
                                                                keyboardType="numeric"
                                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37%') }]}
                                                                placeholder="Buyer BrokerRage"
                                                                name="brbrk_rt"
                                                                defaultValue={x.brbrk_rt}
                                                                onChangeText={text => handleProductDetails(text, i, "brbrk_rt")}
                                                                onFocus={() => onFocusChange("buyerBrokerage", i)}
                                                                onBlur={() => onBlurChange("buyerBrokerage", i)}
                                                                ref={(element) => buyerBrokerageRef.current[i] = element}
                                                                onSubmitEditing={() => sellerBrokerageRef.current[i].focus()}

                                                            />
                                                            <TextInput
                                                                keyboardType="numeric"
                                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('37%') }]}
                                                                placeholder="Seller Brokerage"
                                                                name="slbrk_rt"
                                                                defaultValue={x.slbrk_rt}
                                                                onChangeText={text => handleProductDetails(text, i, "slbrk_rt")}
                                                                onFocus={() => onFocusChange("sellerBrokerage", i)}
                                                                onBlur={() => onBlurChange("sellerBrokerage", i)}
                                                                ref={(element) => sellerBrokerageRef.current[i] = element}
                                                                onSubmitEditing={() => productRemarksRef.current[i].focus()}

                                                            />

                                                        </View>


                                                        <View style={styles.column}>
                                                            <TextInput
                                                                style={[styles.input, { backgroundColor: "#D3FD7A", width: wp('77%') }]}
                                                                placeholder="Product Remarks"
                                                                defaultValue={x.productRemarks}
                                                                onChangeText={(text) => setProductRemarks(text)}
                                                                onFocus={() => onFocusChange("productRemarks", i)}
                                                                onBlur={() => onBlurChange("productRemarks", i)}
                                                                ref={(element) => productRemarksRef.current[i] = element}
                                                            />

                                                        </View>

                                                    </> : <></>
                                            }
                                            <View style={[styles.column, { justifyContent: "space-around", marginBottom: 20 }]}>
                                                {
                                                    contract_sauda_group.length - 1 === i &&
                                                    <TouchableOpacity onPress={() => handleProductClick(i)} style={[styles.button,{flex:1}]}>
                                                        <Text style={{color:"white"}}>Add Product</Text>
                                                    </TouchableOpacity>}

                                                {
                                                    contract_sauda_group.length !== 1 ?
                                                        <TouchableOpacity onPress={() => handleRemoveClick(i)}
                                                            style={styles.button}>
                                                            <Text style={{color:"white"}}>Remove</Text>
                                                        </TouchableOpacity>

                                                        : (<></>)}

                                            </View>


                                        </View>

                                    ))}
                            </View>
                            <View style={[styles.column, { justifyContent: "center" }]}>

                            <TouchableOpacity onPress={() => handleSubmit()} 
                                                            style={styles.button1}
                                                            disabled={disabled}>
                                                                
                                                            <Text style={{color:"white"}}>Submit</Text>
                                                        </TouchableOpacity>
                                                  </View>
                        </Form>

                    </ScrollView></>


            ) : (<ActivityIndicator size="large" color="skyblue" size={100} />
                )
            }
        </>

    )
}



export default Dealer

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
        width: '40%',
        height: "30%",
        top: -10,
        left: 120


    },
    dealnumber: {
        display: "flex",
        flexDirection: "row"
    },
    column: {
        display: "flex",
        flexDirection: "row"
    },
    item: {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
    },
    input: {
        height: 35,
        flex: 1,
        width: wp('22%'),
        borderStartWidth: 2,
        borderColor: "grey",
        borderEndWidth: 0.5,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        margin: 4,
        padding: 8,
        borderRadius: 5
    },
    progress: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 350,



    },

    form: {
        flex: 1,
        top: -110,
        marginTop: 100,
        marginHorizontal: 10,
        borderRadius: 12,
        padding: 10,

    },
    container: {
        flex: 1,
        flexDirection: "column",
        height: height,


    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: wp("40%"),
        top: 4,
        left: 0,
        backgroundColor: theme1.DARK_BLUE_COLOR,
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    button1: {
        alignItems: "center",
        justifyContent: "center",
        width: wp("90%"),
        top: 4,
        left: 0,
        backgroundColor: theme1.DARK_BLUE_COLOR,
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        padding: 10,
        marginBottom: 5,
        marginTop:10
    }

})
