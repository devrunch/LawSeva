import { useState } from "react"
import img1 from '../assets/img/11668660_20945248 1.png'
import img2 from '../assets/img/Invoice-amico (1) 1.png'
const GstDetails = () => {

  function customRound(number) {
    let rounded = Math.round(number * 100) / 100; // Round to two decimal places
    if (rounded % 1 === 0) { // If the rounded number is a whole number
      return Math.ceil(number); // Round up to the nearest whole number
    }
    return rounded;
  }
  const [actualAmount, setActualAmount] = useState(0.0);
  const [totalAmount, setToatalAmount] = useState(0.0);
  const [gstAmount, setGstAmount] = useState(0.0);
  const [tax, setTax] = useState(12.0);
  const taxChange = (e) => {
    let gst = (e.target.value / 100) * actualAmount;
    setGstAmount(gst);
    setToatalAmount(parseInt(actualAmount) + gst);
  }
  const actChange = (e) => {
    setActualAmount(e.target.value);
    if (tax > 0) {
      let gst = (tax / 100) * e.target.value;
      setGstAmount(gst);
      setToatalAmount(parseInt(e.target.value) + gst);
    }
  }
  const gstChange = (e) => {
    if (tax > 0) {
      setGstAmount(e.target.value);
      console.log(e.target.value)
      // console.log(gstAmount)
      let act = e.target.value / (tax / 100);
      setActualAmount(act);
      let total = act + parseInt(e.target.value);
      setToatalAmount(total);
    }
  }
  const totChange = (e) => {
    setToatalAmount(e.target.value);
    let act = e.target.value / (1 + (tax / 100));
    console.log(Math.round(act))
    setActualAmount(customRound(act))
    let gst = act * (tax / 100)
    setGstAmount(customRound(gst));

  }
  return (
    <>
      <div className="bg-[#2d3dc5] container text-center p-14">
        <h1 className="text-3xl font-extrabold text-white">
          ONLINE GST CALCULATOR
        </h1>
        <p className="text-white">
          Calculate GST in India with CA Cloud Desk online GST calculator
        </p>
      </div>
      <div className="half-colored p-4">
        <div className="bg-slate-200 drop-shadow-md w-1/2 p-11 m-auto rounded-md font-bold flex flex-col gap-y-3" >
          <div>
            <label htmlFor="" className="font-sans font-bold">Select GST%</label><br />
            <div className="flex justify-between mt-2 flex-wrap">
              <div className="custom-radio">
                <input type="radio" id="GST0.25" name="GST" value={0.25} onClick={(e) => {
                  setTax(0.25);
                  taxChange(e)
                }} checked={tax == 0.25} />
                <label htmlFor="GST0.25">0.25%</label>
              </div>
              <div className="custom-radio">
                <input type="radio" id="GST3" name="GST" value={3} onClick={(e) => {
                  setTax(3.0)
                  taxChange(e)
                }} checked={tax == 3.0} />
                <label htmlFor="GST3">3%</label>
              </div>
              <div className="custom-radio">
                <input type="radio" id="GST5" name="GST" value={5} onClick={(e) => {
                  setTax(5.0)
                  taxChange(e)
                }} checked={tax == 5.0} />
                <label htmlFor="GST5">5%</label>
              </div>
              <div className="custom-radio">
                <input type="radio" id="GST12" name="GST" value={12} onClick={(e) => {
                  setTax(12.0)
                  taxChange(e)
                }} checked={tax == 12.0} />
                <label htmlFor="GST12">12%</label>
              </div>
              <div className="custom-radio">
                <input type="radio" id="GST18" name="GST" value={18} onClick={(e) => {
                  setTax(18.0)
                  taxChange(e)
                }} checked={tax == 18.0} />
                <label htmlFor="GST18">18%</label>
              </div>
              <div className="custom-radio">
                <input type="radio" id="GST28" name="GST" value={28} onClick={(e) => {
                  setTax(28.0)
                  taxChange(e)
                }} checked={tax == 28.0} />
                <label htmlFor="GST28">28%</label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="">Tax</label><br />
            <select name="" id="" className="mt-2 w-full rounded-md p-2 bg-slate-200 border-solid border-2 border-gray-500" >
              <option value="exc">Exclusive</option>
              <option value="inc">Inclusive</option>
            </select>
          </div>
          <div className="flex flex-col flex-wrap" >
            <label htmlFor="">Actual Amount</label>
            <input type="number" className="mt-2 w-full rounded-md p-2 bg-slate-200 border-solid border-2 border-gray-500" value={actualAmount} onChange={(e) => {
              actChange(e)
            }} />
          </div>
          <div className="flex w-full justify-between gap-x-3">
            <div>
              <label htmlFor="">GST Amount</label>
              <input type="number" className="text-3xl mt-2 w-full h-16 rounded-md p-2 bg-slate-200 border-solid border-2 border-gray-500" value={gstAmount} onChange={(e) => gstChange(e)} />
            </div>
            <div>
              <label htmlFor="">Total Amount</label>
              <input type="number" className="text-3xl mt-2 w-full h-16 rounded-md p-2 bg-slate-200 border-solid border-2 border-gray-500" value={totalAmount} onChange={(e) => totChange(e)} />
            </div>
          </div>
        </div>
      </div>
      <div className=" p-4 container m-auto flex justify-center align-middle w-4/5 ">
        <div className="m-auto">
          <h2 className="text-xl font-bold mb-2">GST - the Goods and Services Tax</h2>
          <p className="text-gray-700">
            GST is an indirect tax that came into effect from 1st July 2017. Before GST, there were many different taxes in India, like VAT, excise duty, and service tax. GST replaced these with a single tax on most goods and services you buy. GST is collected at the point of consumption.
          </p>
          <br />
          <p className="text-gray-700">
            Most goods and services in India have a GST tax added at different rates (0%, 5%, 12%, 18%, 28%).
          </p>
          <br />
          <p className="text-gray-700">
            There are some exceptions, like petrol, alcohol and electricity, which are taxed separately by each state. In addition, some items like luxury cars and tobacco have an extra tax on top of the regular GST.
          </p>
        </div>
        <div className="ml-8">
          <img src={img1} alt="" width={800} />
        </div>
      </div>
      <div className=" p-4 container m-auto flex justify-around align-middle w-4/5 ">
        <div className="mr-8">
          <img src={img2} alt="" width={500} />
        </div>
        <div className="m-auto">
          <h2 className="text-xl font-bold mb-2">There are four types of GST.</h2>
          <p className="text-gray-700">
          For goods bought within the same state (intrastate): GST is split into two parts - SGST (collected by the state) and CGST (collected by the central government).
          </p>
          <br />
          <p className="text-gray-700">
          For goods moving between states (interstate): A single IGST is applied, collected by the central government and then distributed to both the sending and receiving states.
          </p>
          <br />
          
        </div>
      </div>
    </>
  )
}

export default GstDetails