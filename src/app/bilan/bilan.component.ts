import { HtmlParser } from '@angular/compiler';
import { Component } from '@angular/core';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class BilanComponent {

  fuelInput: string = '';
  // ---------table 1-----------//
  carbonPercentage = 87;
  hydrogenPercentage = 12;
  sulfurPercentage = 0.6;
  oxygenPercentage = 0.35;
  nitrogenPercentage = 0.24;

  carbonMassResult: number = 0;
  hydrogenMassResult: number = 0;
  sulfurMassResult: number = 0;
  oxygenMassResult: number = 0;
  nitrogenMassResult: number = 0;


  carbonMassMolaire = 0.012;
  hydrogenMassMolaire = 0.001;
  sulfurMassMolaire = 0.032;
  oxygenMassMolaire = 0.016;
  nitrogenMassMolaire = 0.014;

  carbonMolarFlow: number = 0;
  hydrogenMolarFlow: number = 0;
  sulfurMolarFlow: number = 0;
  oxygenMolarFlow: number = 0;
  nitrogenMolarFlow: number = 0;

 // ---------table 2-----------//
    oxygenFlowRate : number = 0;  
    airFlowRate : number = 0; 
    airMolarFlowRate : number = 0; 
    actualAir : number = 0;

  //-------------table 3---------------//
  FuelMassFlow : number=0;
  waterMassFlowRateInput: string = '';
  waterEnthalpyInput: string = '';
   AtomizationSteamMassFlowRateInput: string = '';
  AtomizationSteamEnthalpyInput: string = '';;
  HighPressureSteamMassFlowRateInput: string = '';
  HighPressureSteamEnthalpyInput: string = '';
  AirFlowRateInput: string = '';
  AirEnthalpyInput: string = '';
  FuelLowerHeatingInput: string ='';
  
  

//------------------table 4--------------------------//
EnergieIntroduite : number = 0;
UsefullEnergy : number = 0;
WastedEenergy : number = 0;
Efficiency : number = 0;
SpecificConsumption : number = 0;

//------PDF CONVERTER-------------//
 DownloadPDF(): void {
  const displayButtons: NodeListOf<Element> = document.querySelectorAll('#display');
  displayButtons.forEach((button: Element) => {
    (button as HTMLElement).style.display = 'none';
  });

  const element: HTMLElement | null = document.getElementById('content');
  if (element) {
    const opt = {
      margin: 0,
      __filename: "Bilan.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
   
    html2pdf().from(element).set(opt).outputPdf().then((pdf: ArrayBuffer) => {
      displayButtons.forEach((button: Element) => {
        (button as HTMLElement).style.display = 'block';
      });
      
    });
  }
}



  calculateBilan(): void {
    
    const fuelAmount = parseFloat(this.fuelInput) || 0;

      // ---------table 1-----------//
    this.carbonMassResult = parseFloat(((fuelAmount * this.carbonPercentage) / 100).toFixed(2));
    this.hydrogenMassResult = parseFloat(((fuelAmount * this.hydrogenPercentage) / 100).toFixed(2));
    this.sulfurMassResult = parseFloat(((fuelAmount * this.sulfurPercentage) / 100).toFixed(2));
    this.oxygenMassResult = parseFloat(((fuelAmount * this.oxygenPercentage) / 100).toFixed(2));
    this.nitrogenMassResult = parseFloat(((fuelAmount * this.nitrogenPercentage) / 100).toFixed(2));

    this.carbonMolarFlow = parseFloat((this.carbonMassResult / this.carbonMassMolaire).toFixed(2));
    this.hydrogenMolarFlow = parseFloat((this.hydrogenMassResult / this.hydrogenMassMolaire).toFixed(2));
    this.sulfurMolarFlow = parseFloat((this.sulfurMassResult / this.sulfurMassMolaire).toFixed(2));
    this.oxygenMolarFlow = parseFloat((this.oxygenMassResult / this.oxygenMassMolaire).toFixed(2));
    this.nitrogenMolarFlow = parseFloat((this.nitrogenMassResult / this.nitrogenMassMolaire).toFixed(2));

// ---------table 2-----------//
    this.oxygenFlowRate = parseFloat(((this.carbonMolarFlow+(this.hydrogenMolarFlow/2)+this.sulfurMolarFlow)).toFixed(2));
    this.airFlowRate = parseFloat(((this.oxygenFlowRate/21)*100).toFixed(2));
    this.airMolarFlowRate = parseFloat(((this.airFlowRate/1000)*28.84).toFixed(2));
    this.actualAir = parseFloat(((this.airMolarFlowRate*1.23)).toFixed(2));
  
    //-----------table3-------//
    this.FuelMassFlow = fuelAmount;


    //-------table4----------//
   const waterMassFlowAmount = parseFloat(this.waterMassFlowRateInput) || 0;
   const waterEnthalpyAmount = parseFloat(this.waterEnthalpyInput) || 0;
   const AtomizationSteamMassAmount = parseFloat(this.AtomizationSteamMassFlowRateInput) || 0;
   const AtomizationSteamEnthalpyAmount = parseFloat(this.AtomizationSteamEnthalpyInput) || 0;
   const HighPressureSteamMassAmount = parseFloat(this.HighPressureSteamMassFlowRateInput) || 0;
   const HighPressureSteamEnthalpyAmount = parseFloat(this.HighPressureSteamEnthalpyInput) || 0;
   const AirFlowRateAmount = parseFloat(this.AirFlowRateInput) || 0;
   const  AirEnthalpyAmount = parseFloat(this.AirEnthalpyInput) || 0;
   const FuelLowerHeatingIAmount = parseFloat(this.FuelLowerHeatingInput) || 0;

   this.EnergieIntroduite = parseFloat(((waterMassFlowAmount * waterEnthalpyAmount) + 
   (AtomizationSteamMassAmount * AtomizationSteamEnthalpyAmount)  + 
   (AirFlowRateAmount * AirEnthalpyAmount) +
   (this.FuelMassFlow * FuelLowerHeatingIAmount)).toFixed(2));

   this.UsefullEnergy = parseFloat(((HighPressureSteamMassAmount*(HighPressureSteamEnthalpyAmount-waterEnthalpyAmount))).toFixed(2));
   this.WastedEenergy = parseFloat(((this.EnergieIntroduite-this.UsefullEnergy)).toFixed(2));
   this.Efficiency = parseFloat((((this.UsefullEnergy/this.EnergieIntroduite )*100)).toFixed(2));
   this.SpecificConsumption = parseFloat((( this.FuelMassFlow/HighPressureSteamMassAmount )).toFixed(2));
  }
  onCalculateClick(): void {
    this.calculateBilan();
    
   
  }
}
