export type NestedUniqueKeys<T extends object> = keyof T[keyof T] extends never ? T : never

export type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]]
// extracts all keys of the object in the form "A.B.C.D", D limits depth
export type AllKeys<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
    UnionToString<{ [K in keyof T]-?: K extends string | number ?
        `${K}` | AllKeys<T[K], Prev[D]>
        : never
    }[keyof T]> : never

// convert a union to an intersection: X | Y | Z ==> X & Y & Z
export type UnionToIntersection<U> =
  (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

// convert a union to an overloaded function X | Y ==> ((x: X)=>void) & ((y:Y)=>void)     
export type UnionToOvlds<U> = UnionToIntersection<U extends unknown ? (f: U) => void : never>;

// returns true if the type is a union otherwise false
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// takes last from union
export type PopUnion<U> = UnionToOvlds<U> extends ((a: infer A) => void) ? A : never;

// converts "A" | "B" | "C" ==> "C.B.A"
export type UnionToString<U> = IsUnion<U> extends false ? (U extends string ? U : never)
: (PopUnion<U> extends infer P extends string ? `${P}.${UnionToString<Exclude<U, P>>}`: "")

// Checks if "A.B.B.C" has any duplicates between the "."
export type Unique<T> = T extends `${infer First}.${infer Rest}` ? Contains<First, Rest> extends true ? false : Unique<Rest> : true

// Checks if "A" is contained in "A.B.C"
export type Contains<T, STR> = T extends STR ? true : STR extends `${infer First}.${infer Rest}` ? T extends First ? true : Contains<T, Rest> : false

export type NestedUniqueKeys<T extends object> = Unique<AllKeys<T>>