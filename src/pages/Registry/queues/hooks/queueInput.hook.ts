import { create } from 'zustand'

export enum inputRefEnum {
  cedula = "cedula",
  rnc = "rnc",
  pasaporte = "pasaporte"
}

export enum formatRefEnum {
  cedula = "###########",
  rnc = "#########",
  pasaporte = "AA##########",
}

export enum sizeRefEnum {
  cedula = 11,
  rnc = 9,
  pasaporte = 12
}

export type inputRefType = {
  id: number,
  name: string,
  format: string,
}

export const inputRef: inputRefType[] = [
  {
    id: 1,
    name: 'cedula',
    format: "###########",
  },
  {
    id: 2,
    name: 'rnc',
    format: "#########",
  },
  {
    id: 3,
    name: 'pasaporte',
    format: "AA##########",
  },
]

const Title: string[] = [
  "BIENVENIDO AL SISTEMA DE TURNOS",
  "SELECCIONE UNA CATEGORIA",
  "SELECCIONE UNA SUBCATEGORIA PARA: #"
]

const SubTitle: string[] = [
  "INGRESE SU DOCUMENTO DE IDENTIDAD PARA CONTINUAR",
  "",
  ""
]

type activeType  = {
  title: string,
  subtitle: string,
  step: number,
  ref: inputRefType,
}

type categoryType = {
  id: number, 
  name: string,
  color?: string
}

interface inputState {
  active: activeType,
  document: string,
  checked: boolean,
  category: categoryType | null,
  subcategory: categoryType | null,

  setActive: (active: activeType) => void,
  setDocument: (document: string) => void,
  sliceDocument: () => void,
  resetDocument: () => void,
  resetAll: () => void,
  setChecked: (checked: boolean) => void,

  setCategory: (category: categoryType | null) => void,
  setSubcategory: (subcategory: categoryType) => void,
}

export const useQueueInputState = create<inputState>((set) => ({
  active: {
    title: Title[0],
    subtitle: SubTitle[0],
    step: 0,
    ref: inputRef[0],
  },
  document: "",
  checked: false,
  category: null,
  subcategory: null,
  
  setActive: (active: activeType) => set((state) => ({
    active: 
      state.active = {
        title: Title[active.step].replace("#", state.category?.name || ""),
        subtitle: SubTitle[active.step],
        step: active.step,
        ref: active.ref
      }
  
  })),
  
  setDocument: (document: string) => set((state) => ({ document: state.document = document })),
  sliceDocument: () => set((state) => ({ document: state.document = state.document.slice(0, state.document.length - 1)})),
  resetDocument: () => set(() => ({
    document: "",
    checked: false
  })),
  resetAll: () => set(() => ({
    document: "",
    checked: false,
    category: null,
    subcategory: null,
    active: {
      title: Title[0],
      subtitle: SubTitle[0],
      step: 0,
      ref: inputRef[0],
    }
  })),
  setChecked: (checked: boolean) => set((state) => ({ checked: state.checked = checked })),

  setCategory: (category: categoryType | null) => set((state) => ({ category: state.category = category })),
  setSubcategory: (subcategory: categoryType | null) => set((state) => ({ subcategory: state.subcategory = subcategory })),
}))


