
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model LogAcceso
 * 
 */
export type LogAcceso = $Result.DefaultSelection<Prisma.$LogAccesoPayload>
/**
 * Model Categoria
 * 
 */
export type Categoria = $Result.DefaultSelection<Prisma.$CategoriaPayload>
/**
 * Model Producto
 * 
 */
export type Producto = $Result.DefaultSelection<Prisma.$ProductoPayload>
/**
 * Model Proveedor
 * 
 */
export type Proveedor = $Result.DefaultSelection<Prisma.$ProveedorPayload>
/**
 * Model ConfigSistema
 * 
 */
export type ConfigSistema = $Result.DefaultSelection<Prisma.$ConfigSistemaPayload>
/**
 * Model Cliente
 * 
 */
export type Cliente = $Result.DefaultSelection<Prisma.$ClientePayload>
/**
 * Model Venta
 * 
 */
export type Venta = $Result.DefaultSelection<Prisma.$VentaPayload>
/**
 * Model DetalleVenta
 * 
 */
export type DetalleVenta = $Result.DefaultSelection<Prisma.$DetalleVentaPayload>
/**
 * Model EntradaMercaderia
 * 
 */
export type EntradaMercaderia = $Result.DefaultSelection<Prisma.$EntradaMercaderiaPayload>
/**
 * Model BajaInventario
 * 
 */
export type BajaInventario = $Result.DefaultSelection<Prisma.$BajaInventarioPayload>
/**
 * Model SolicitudReposicion
 * 
 */
export type SolicitudReposicion = $Result.DefaultSelection<Prisma.$SolicitudReposicionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.logAcceso`: Exposes CRUD operations for the **LogAcceso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LogAccesos
    * const logAccesos = await prisma.logAcceso.findMany()
    * ```
    */
  get logAcceso(): Prisma.LogAccesoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria`: Exposes CRUD operations for the **Categoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categoria.findMany()
    * ```
    */
  get categoria(): Prisma.CategoriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.producto`: Exposes CRUD operations for the **Producto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productos
    * const productos = await prisma.producto.findMany()
    * ```
    */
  get producto(): Prisma.ProductoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proveedor`: Exposes CRUD operations for the **Proveedor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proveedors
    * const proveedors = await prisma.proveedor.findMany()
    * ```
    */
  get proveedor(): Prisma.ProveedorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.configSistema`: Exposes CRUD operations for the **ConfigSistema** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConfigSistemas
    * const configSistemas = await prisma.configSistema.findMany()
    * ```
    */
  get configSistema(): Prisma.ConfigSistemaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cliente`: Exposes CRUD operations for the **Cliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.cliente.findMany()
    * ```
    */
  get cliente(): Prisma.ClienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.venta`: Exposes CRUD operations for the **Venta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ventas
    * const ventas = await prisma.venta.findMany()
    * ```
    */
  get venta(): Prisma.VentaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.detalleVenta`: Exposes CRUD operations for the **DetalleVenta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DetalleVentas
    * const detalleVentas = await prisma.detalleVenta.findMany()
    * ```
    */
  get detalleVenta(): Prisma.DetalleVentaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entradaMercaderia`: Exposes CRUD operations for the **EntradaMercaderia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EntradaMercaderias
    * const entradaMercaderias = await prisma.entradaMercaderia.findMany()
    * ```
    */
  get entradaMercaderia(): Prisma.EntradaMercaderiaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bajaInventario`: Exposes CRUD operations for the **BajaInventario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BajaInventarios
    * const bajaInventarios = await prisma.bajaInventario.findMany()
    * ```
    */
  get bajaInventario(): Prisma.BajaInventarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.solicitudReposicion`: Exposes CRUD operations for the **SolicitudReposicion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SolicitudReposicions
    * const solicitudReposicions = await prisma.solicitudReposicion.findMany()
    * ```
    */
  get solicitudReposicion(): Prisma.SolicitudReposicionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    LogAcceso: 'LogAcceso',
    Categoria: 'Categoria',
    Producto: 'Producto',
    Proveedor: 'Proveedor',
    ConfigSistema: 'ConfigSistema',
    Cliente: 'Cliente',
    Venta: 'Venta',
    DetalleVenta: 'DetalleVenta',
    EntradaMercaderia: 'EntradaMercaderia',
    BajaInventario: 'BajaInventario',
    SolicitudReposicion: 'SolicitudReposicion'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "logAcceso" | "categoria" | "producto" | "proveedor" | "configSistema" | "cliente" | "venta" | "detalleVenta" | "entradaMercaderia" | "bajaInventario" | "solicitudReposicion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      LogAcceso: {
        payload: Prisma.$LogAccesoPayload<ExtArgs>
        fields: Prisma.LogAccesoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LogAccesoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LogAccesoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload>
          }
          findFirst: {
            args: Prisma.LogAccesoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LogAccesoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload>
          }
          findMany: {
            args: Prisma.LogAccesoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload>[]
          }
          create: {
            args: Prisma.LogAccesoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload>
          }
          createMany: {
            args: Prisma.LogAccesoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LogAccesoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload>[]
          }
          delete: {
            args: Prisma.LogAccesoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload>
          }
          update: {
            args: Prisma.LogAccesoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload>
          }
          deleteMany: {
            args: Prisma.LogAccesoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LogAccesoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LogAccesoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload>[]
          }
          upsert: {
            args: Prisma.LogAccesoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogAccesoPayload>
          }
          aggregate: {
            args: Prisma.LogAccesoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLogAcceso>
          }
          groupBy: {
            args: Prisma.LogAccesoGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogAccesoGroupByOutputType>[]
          }
          count: {
            args: Prisma.LogAccesoCountArgs<ExtArgs>
            result: $Utils.Optional<LogAccesoCountAggregateOutputType> | number
          }
        }
      }
      Categoria: {
        payload: Prisma.$CategoriaPayload<ExtArgs>
        fields: Prisma.CategoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findFirst: {
            args: Prisma.CategoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findMany: {
            args: Prisma.CategoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          create: {
            args: Prisma.CategoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          createMany: {
            args: Prisma.CategoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          delete: {
            args: Prisma.CategoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          update: {
            args: Prisma.CategoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          deleteMany: {
            args: Prisma.CategoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoriaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          upsert: {
            args: Prisma.CategoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria>
          }
          groupBy: {
            args: Prisma.CategoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriaCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number
          }
        }
      }
      Producto: {
        payload: Prisma.$ProductoPayload<ExtArgs>
        fields: Prisma.ProductoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findFirst: {
            args: Prisma.ProductoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findMany: {
            args: Prisma.ProductoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          create: {
            args: Prisma.ProductoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          createMany: {
            args: Prisma.ProductoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          delete: {
            args: Prisma.ProductoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          update: {
            args: Prisma.ProductoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          deleteMany: {
            args: Prisma.ProductoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          upsert: {
            args: Prisma.ProductoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          aggregate: {
            args: Prisma.ProductoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducto>
          }
          groupBy: {
            args: Prisma.ProductoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoCountAggregateOutputType> | number
          }
        }
      }
      Proveedor: {
        payload: Prisma.$ProveedorPayload<ExtArgs>
        fields: Prisma.ProveedorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProveedorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProveedorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          findFirst: {
            args: Prisma.ProveedorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProveedorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          findMany: {
            args: Prisma.ProveedorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>[]
          }
          create: {
            args: Prisma.ProveedorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          createMany: {
            args: Prisma.ProveedorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProveedorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>[]
          }
          delete: {
            args: Prisma.ProveedorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          update: {
            args: Prisma.ProveedorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          deleteMany: {
            args: Prisma.ProveedorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProveedorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProveedorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>[]
          }
          upsert: {
            args: Prisma.ProveedorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProveedorPayload>
          }
          aggregate: {
            args: Prisma.ProveedorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProveedor>
          }
          groupBy: {
            args: Prisma.ProveedorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProveedorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProveedorCountArgs<ExtArgs>
            result: $Utils.Optional<ProveedorCountAggregateOutputType> | number
          }
        }
      }
      ConfigSistema: {
        payload: Prisma.$ConfigSistemaPayload<ExtArgs>
        fields: Prisma.ConfigSistemaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfigSistemaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfigSistemaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload>
          }
          findFirst: {
            args: Prisma.ConfigSistemaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfigSistemaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload>
          }
          findMany: {
            args: Prisma.ConfigSistemaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload>[]
          }
          create: {
            args: Prisma.ConfigSistemaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload>
          }
          createMany: {
            args: Prisma.ConfigSistemaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfigSistemaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload>[]
          }
          delete: {
            args: Prisma.ConfigSistemaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload>
          }
          update: {
            args: Prisma.ConfigSistemaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload>
          }
          deleteMany: {
            args: Prisma.ConfigSistemaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfigSistemaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConfigSistemaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload>[]
          }
          upsert: {
            args: Prisma.ConfigSistemaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigSistemaPayload>
          }
          aggregate: {
            args: Prisma.ConfigSistemaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfigSistema>
          }
          groupBy: {
            args: Prisma.ConfigSistemaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfigSistemaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfigSistemaCountArgs<ExtArgs>
            result: $Utils.Optional<ConfigSistemaCountAggregateOutputType> | number
          }
        }
      }
      Cliente: {
        payload: Prisma.$ClientePayload<ExtArgs>
        fields: Prisma.ClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findFirst: {
            args: Prisma.ClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findMany: {
            args: Prisma.ClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          create: {
            args: Prisma.ClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          createMany: {
            args: Prisma.ClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClienteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          delete: {
            args: Prisma.ClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          update: {
            args: Prisma.ClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          deleteMany: {
            args: Prisma.ClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClienteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          upsert: {
            args: Prisma.ClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          aggregate: {
            args: Prisma.ClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCliente>
          }
          groupBy: {
            args: Prisma.ClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClienteCountArgs<ExtArgs>
            result: $Utils.Optional<ClienteCountAggregateOutputType> | number
          }
        }
      }
      Venta: {
        payload: Prisma.$VentaPayload<ExtArgs>
        fields: Prisma.VentaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VentaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VentaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload>
          }
          findFirst: {
            args: Prisma.VentaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VentaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload>
          }
          findMany: {
            args: Prisma.VentaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload>[]
          }
          create: {
            args: Prisma.VentaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload>
          }
          createMany: {
            args: Prisma.VentaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VentaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload>[]
          }
          delete: {
            args: Prisma.VentaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload>
          }
          update: {
            args: Prisma.VentaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload>
          }
          deleteMany: {
            args: Prisma.VentaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VentaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VentaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload>[]
          }
          upsert: {
            args: Prisma.VentaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VentaPayload>
          }
          aggregate: {
            args: Prisma.VentaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenta>
          }
          groupBy: {
            args: Prisma.VentaGroupByArgs<ExtArgs>
            result: $Utils.Optional<VentaGroupByOutputType>[]
          }
          count: {
            args: Prisma.VentaCountArgs<ExtArgs>
            result: $Utils.Optional<VentaCountAggregateOutputType> | number
          }
        }
      }
      DetalleVenta: {
        payload: Prisma.$DetalleVentaPayload<ExtArgs>
        fields: Prisma.DetalleVentaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DetalleVentaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DetalleVentaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload>
          }
          findFirst: {
            args: Prisma.DetalleVentaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DetalleVentaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload>
          }
          findMany: {
            args: Prisma.DetalleVentaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload>[]
          }
          create: {
            args: Prisma.DetalleVentaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload>
          }
          createMany: {
            args: Prisma.DetalleVentaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DetalleVentaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload>[]
          }
          delete: {
            args: Prisma.DetalleVentaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload>
          }
          update: {
            args: Prisma.DetalleVentaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload>
          }
          deleteMany: {
            args: Prisma.DetalleVentaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DetalleVentaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DetalleVentaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload>[]
          }
          upsert: {
            args: Prisma.DetalleVentaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleVentaPayload>
          }
          aggregate: {
            args: Prisma.DetalleVentaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDetalleVenta>
          }
          groupBy: {
            args: Prisma.DetalleVentaGroupByArgs<ExtArgs>
            result: $Utils.Optional<DetalleVentaGroupByOutputType>[]
          }
          count: {
            args: Prisma.DetalleVentaCountArgs<ExtArgs>
            result: $Utils.Optional<DetalleVentaCountAggregateOutputType> | number
          }
        }
      }
      EntradaMercaderia: {
        payload: Prisma.$EntradaMercaderiaPayload<ExtArgs>
        fields: Prisma.EntradaMercaderiaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntradaMercaderiaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntradaMercaderiaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload>
          }
          findFirst: {
            args: Prisma.EntradaMercaderiaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntradaMercaderiaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload>
          }
          findMany: {
            args: Prisma.EntradaMercaderiaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload>[]
          }
          create: {
            args: Prisma.EntradaMercaderiaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload>
          }
          createMany: {
            args: Prisma.EntradaMercaderiaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntradaMercaderiaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload>[]
          }
          delete: {
            args: Prisma.EntradaMercaderiaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload>
          }
          update: {
            args: Prisma.EntradaMercaderiaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload>
          }
          deleteMany: {
            args: Prisma.EntradaMercaderiaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntradaMercaderiaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EntradaMercaderiaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload>[]
          }
          upsert: {
            args: Prisma.EntradaMercaderiaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaMercaderiaPayload>
          }
          aggregate: {
            args: Prisma.EntradaMercaderiaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntradaMercaderia>
          }
          groupBy: {
            args: Prisma.EntradaMercaderiaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntradaMercaderiaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntradaMercaderiaCountArgs<ExtArgs>
            result: $Utils.Optional<EntradaMercaderiaCountAggregateOutputType> | number
          }
        }
      }
      BajaInventario: {
        payload: Prisma.$BajaInventarioPayload<ExtArgs>
        fields: Prisma.BajaInventarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BajaInventarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BajaInventarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload>
          }
          findFirst: {
            args: Prisma.BajaInventarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BajaInventarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload>
          }
          findMany: {
            args: Prisma.BajaInventarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload>[]
          }
          create: {
            args: Prisma.BajaInventarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload>
          }
          createMany: {
            args: Prisma.BajaInventarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BajaInventarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload>[]
          }
          delete: {
            args: Prisma.BajaInventarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload>
          }
          update: {
            args: Prisma.BajaInventarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload>
          }
          deleteMany: {
            args: Prisma.BajaInventarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BajaInventarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BajaInventarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload>[]
          }
          upsert: {
            args: Prisma.BajaInventarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BajaInventarioPayload>
          }
          aggregate: {
            args: Prisma.BajaInventarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBajaInventario>
          }
          groupBy: {
            args: Prisma.BajaInventarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<BajaInventarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.BajaInventarioCountArgs<ExtArgs>
            result: $Utils.Optional<BajaInventarioCountAggregateOutputType> | number
          }
        }
      }
      SolicitudReposicion: {
        payload: Prisma.$SolicitudReposicionPayload<ExtArgs>
        fields: Prisma.SolicitudReposicionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SolicitudReposicionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SolicitudReposicionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload>
          }
          findFirst: {
            args: Prisma.SolicitudReposicionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SolicitudReposicionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload>
          }
          findMany: {
            args: Prisma.SolicitudReposicionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload>[]
          }
          create: {
            args: Prisma.SolicitudReposicionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload>
          }
          createMany: {
            args: Prisma.SolicitudReposicionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SolicitudReposicionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload>[]
          }
          delete: {
            args: Prisma.SolicitudReposicionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload>
          }
          update: {
            args: Prisma.SolicitudReposicionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload>
          }
          deleteMany: {
            args: Prisma.SolicitudReposicionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SolicitudReposicionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SolicitudReposicionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload>[]
          }
          upsert: {
            args: Prisma.SolicitudReposicionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudReposicionPayload>
          }
          aggregate: {
            args: Prisma.SolicitudReposicionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSolicitudReposicion>
          }
          groupBy: {
            args: Prisma.SolicitudReposicionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SolicitudReposicionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SolicitudReposicionCountArgs<ExtArgs>
            result: $Utils.Optional<SolicitudReposicionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    logAcceso?: LogAccesoOmit
    categoria?: CategoriaOmit
    producto?: ProductoOmit
    proveedor?: ProveedorOmit
    configSistema?: ConfigSistemaOmit
    cliente?: ClienteOmit
    venta?: VentaOmit
    detalleVenta?: DetalleVentaOmit
    entradaMercaderia?: EntradaMercaderiaOmit
    bajaInventario?: BajaInventarioOmit
    solicitudReposicion?: SolicitudReposicionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    logAccesos: number
    ventas: number
    entradasMercaderia: number
    bajas: number
    solicitudes: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logAccesos?: boolean | UsuarioCountOutputTypeCountLogAccesosArgs
    ventas?: boolean | UsuarioCountOutputTypeCountVentasArgs
    entradasMercaderia?: boolean | UsuarioCountOutputTypeCountEntradasMercaderiaArgs
    bajas?: boolean | UsuarioCountOutputTypeCountBajasArgs
    solicitudes?: boolean | UsuarioCountOutputTypeCountSolicitudesArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountLogAccesosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogAccesoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountVentasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VentaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountEntradasMercaderiaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntradaMercaderiaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountBajasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BajaInventarioWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountSolicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitudReposicionWhereInput
  }


  /**
   * Count Type CategoriaCountOutputType
   */

  export type CategoriaCountOutputType = {
    productos: number
  }

  export type CategoriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | CategoriaCountOutputTypeCountProductosArgs
  }

  // Custom InputTypes
  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriaCountOutputType
     */
    select?: CategoriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountProductosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
  }


  /**
   * Count Type ProductoCountOutputType
   */

  export type ProductoCountOutputType = {
    detallesVenta: number
    entradasMercaderia: number
    bajas: number
    solicitudes: number
  }

  export type ProductoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detallesVenta?: boolean | ProductoCountOutputTypeCountDetallesVentaArgs
    entradasMercaderia?: boolean | ProductoCountOutputTypeCountEntradasMercaderiaArgs
    bajas?: boolean | ProductoCountOutputTypeCountBajasArgs
    solicitudes?: boolean | ProductoCountOutputTypeCountSolicitudesArgs
  }

  // Custom InputTypes
  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoCountOutputType
     */
    select?: ProductoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountDetallesVentaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DetalleVentaWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountEntradasMercaderiaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntradaMercaderiaWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountBajasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BajaInventarioWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountSolicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitudReposicionWhereInput
  }


  /**
   * Count Type ProveedorCountOutputType
   */

  export type ProveedorCountOutputType = {
    entradasMercaderia: number
    solicitudes: number
  }

  export type ProveedorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entradasMercaderia?: boolean | ProveedorCountOutputTypeCountEntradasMercaderiaArgs
    solicitudes?: boolean | ProveedorCountOutputTypeCountSolicitudesArgs
  }

  // Custom InputTypes
  /**
   * ProveedorCountOutputType without action
   */
  export type ProveedorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProveedorCountOutputType
     */
    select?: ProveedorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProveedorCountOutputType without action
   */
  export type ProveedorCountOutputTypeCountEntradasMercaderiaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntradaMercaderiaWhereInput
  }

  /**
   * ProveedorCountOutputType without action
   */
  export type ProveedorCountOutputTypeCountSolicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitudReposicionWhereInput
  }


  /**
   * Count Type ClienteCountOutputType
   */

  export type ClienteCountOutputType = {
    ventas: number
  }

  export type ClienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ventas?: boolean | ClienteCountOutputTypeCountVentasArgs
  }

  // Custom InputTypes
  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClienteCountOutputType
     */
    select?: ClienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountVentasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VentaWhereInput
  }


  /**
   * Count Type VentaCountOutputType
   */

  export type VentaCountOutputType = {
    detalles: number
  }

  export type VentaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detalles?: boolean | VentaCountOutputTypeCountDetallesArgs
  }

  // Custom InputTypes
  /**
   * VentaCountOutputType without action
   */
  export type VentaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaCountOutputType
     */
    select?: VentaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VentaCountOutputType without action
   */
  export type VentaCountOutputTypeCountDetallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DetalleVentaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    email: string | null
    passwordHash: string | null
    rol: string | null
    activo: boolean | null
    resetCode: string | null
    resetExpiry: Date | null
    creadoEn: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    email: string | null
    passwordHash: string | null
    rol: string | null
    activo: boolean | null
    resetCode: string | null
    resetExpiry: Date | null
    creadoEn: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    email: number
    passwordHash: number
    rol: number
    activo: number
    resetCode: number
    resetExpiry: number
    creadoEn: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    passwordHash?: true
    rol?: true
    activo?: true
    resetCode?: true
    resetExpiry?: true
    creadoEn?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    passwordHash?: true
    rol?: true
    activo?: true
    resetCode?: true
    resetExpiry?: true
    creadoEn?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    passwordHash?: true
    rol?: true
    activo?: true
    resetCode?: true
    resetExpiry?: true
    creadoEn?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo: boolean
    resetCode: string | null
    resetExpiry: Date | null
    creadoEn: Date
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    passwordHash?: boolean
    rol?: boolean
    activo?: boolean
    resetCode?: boolean
    resetExpiry?: boolean
    creadoEn?: boolean
    logAccesos?: boolean | Usuario$logAccesosArgs<ExtArgs>
    ventas?: boolean | Usuario$ventasArgs<ExtArgs>
    entradasMercaderia?: boolean | Usuario$entradasMercaderiaArgs<ExtArgs>
    bajas?: boolean | Usuario$bajasArgs<ExtArgs>
    solicitudes?: boolean | Usuario$solicitudesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    passwordHash?: boolean
    rol?: boolean
    activo?: boolean
    resetCode?: boolean
    resetExpiry?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    passwordHash?: boolean
    rol?: boolean
    activo?: boolean
    resetCode?: boolean
    resetExpiry?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
    email?: boolean
    passwordHash?: boolean
    rol?: boolean
    activo?: boolean
    resetCode?: boolean
    resetExpiry?: boolean
    creadoEn?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "email" | "passwordHash" | "rol" | "activo" | "resetCode" | "resetExpiry" | "creadoEn", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logAccesos?: boolean | Usuario$logAccesosArgs<ExtArgs>
    ventas?: boolean | Usuario$ventasArgs<ExtArgs>
    entradasMercaderia?: boolean | Usuario$entradasMercaderiaArgs<ExtArgs>
    bajas?: boolean | Usuario$bajasArgs<ExtArgs>
    solicitudes?: boolean | Usuario$solicitudesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      logAccesos: Prisma.$LogAccesoPayload<ExtArgs>[]
      ventas: Prisma.$VentaPayload<ExtArgs>[]
      entradasMercaderia: Prisma.$EntradaMercaderiaPayload<ExtArgs>[]
      bajas: Prisma.$BajaInventarioPayload<ExtArgs>[]
      solicitudes: Prisma.$SolicitudReposicionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      email: string
      passwordHash: string
      rol: string
      activo: boolean
      resetCode: string | null
      resetExpiry: Date | null
      creadoEn: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    logAccesos<T extends Usuario$logAccesosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$logAccesosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ventas<T extends Usuario$ventasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$ventasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entradasMercaderia<T extends Usuario$entradasMercaderiaArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$entradasMercaderiaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bajas<T extends Usuario$bajasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$bajasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solicitudes<T extends Usuario$solicitudesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$solicitudesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly passwordHash: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'String'>
    readonly activo: FieldRef<"Usuario", 'Boolean'>
    readonly resetCode: FieldRef<"Usuario", 'String'>
    readonly resetExpiry: FieldRef<"Usuario", 'DateTime'>
    readonly creadoEn: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.logAccesos
   */
  export type Usuario$logAccesosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    where?: LogAccesoWhereInput
    orderBy?: LogAccesoOrderByWithRelationInput | LogAccesoOrderByWithRelationInput[]
    cursor?: LogAccesoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LogAccesoScalarFieldEnum | LogAccesoScalarFieldEnum[]
  }

  /**
   * Usuario.ventas
   */
  export type Usuario$ventasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    where?: VentaWhereInput
    orderBy?: VentaOrderByWithRelationInput | VentaOrderByWithRelationInput[]
    cursor?: VentaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VentaScalarFieldEnum | VentaScalarFieldEnum[]
  }

  /**
   * Usuario.entradasMercaderia
   */
  export type Usuario$entradasMercaderiaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    where?: EntradaMercaderiaWhereInput
    orderBy?: EntradaMercaderiaOrderByWithRelationInput | EntradaMercaderiaOrderByWithRelationInput[]
    cursor?: EntradaMercaderiaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntradaMercaderiaScalarFieldEnum | EntradaMercaderiaScalarFieldEnum[]
  }

  /**
   * Usuario.bajas
   */
  export type Usuario$bajasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    where?: BajaInventarioWhereInput
    orderBy?: BajaInventarioOrderByWithRelationInput | BajaInventarioOrderByWithRelationInput[]
    cursor?: BajaInventarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BajaInventarioScalarFieldEnum | BajaInventarioScalarFieldEnum[]
  }

  /**
   * Usuario.solicitudes
   */
  export type Usuario$solicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    where?: SolicitudReposicionWhereInput
    orderBy?: SolicitudReposicionOrderByWithRelationInput | SolicitudReposicionOrderByWithRelationInput[]
    cursor?: SolicitudReposicionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitudReposicionScalarFieldEnum | SolicitudReposicionScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model LogAcceso
   */

  export type AggregateLogAcceso = {
    _count: LogAccesoCountAggregateOutputType | null
    _avg: LogAccesoAvgAggregateOutputType | null
    _sum: LogAccesoSumAggregateOutputType | null
    _min: LogAccesoMinAggregateOutputType | null
    _max: LogAccesoMaxAggregateOutputType | null
  }

  export type LogAccesoAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type LogAccesoSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
  }

  export type LogAccesoMinAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    rol: string | null
    timestamp: Date | null
    archivado: boolean | null
  }

  export type LogAccesoMaxAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    rol: string | null
    timestamp: Date | null
    archivado: boolean | null
  }

  export type LogAccesoCountAggregateOutputType = {
    id: number
    usuarioId: number
    rol: number
    timestamp: number
    archivado: number
    _all: number
  }


  export type LogAccesoAvgAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type LogAccesoSumAggregateInputType = {
    id?: true
    usuarioId?: true
  }

  export type LogAccesoMinAggregateInputType = {
    id?: true
    usuarioId?: true
    rol?: true
    timestamp?: true
    archivado?: true
  }

  export type LogAccesoMaxAggregateInputType = {
    id?: true
    usuarioId?: true
    rol?: true
    timestamp?: true
    archivado?: true
  }

  export type LogAccesoCountAggregateInputType = {
    id?: true
    usuarioId?: true
    rol?: true
    timestamp?: true
    archivado?: true
    _all?: true
  }

  export type LogAccesoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogAcceso to aggregate.
     */
    where?: LogAccesoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogAccesos to fetch.
     */
    orderBy?: LogAccesoOrderByWithRelationInput | LogAccesoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LogAccesoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogAccesos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogAccesos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LogAccesos
    **/
    _count?: true | LogAccesoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LogAccesoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LogAccesoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogAccesoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogAccesoMaxAggregateInputType
  }

  export type GetLogAccesoAggregateType<T extends LogAccesoAggregateArgs> = {
        [P in keyof T & keyof AggregateLogAcceso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogAcceso[P]>
      : GetScalarType<T[P], AggregateLogAcceso[P]>
  }




  export type LogAccesoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogAccesoWhereInput
    orderBy?: LogAccesoOrderByWithAggregationInput | LogAccesoOrderByWithAggregationInput[]
    by: LogAccesoScalarFieldEnum[] | LogAccesoScalarFieldEnum
    having?: LogAccesoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogAccesoCountAggregateInputType | true
    _avg?: LogAccesoAvgAggregateInputType
    _sum?: LogAccesoSumAggregateInputType
    _min?: LogAccesoMinAggregateInputType
    _max?: LogAccesoMaxAggregateInputType
  }

  export type LogAccesoGroupByOutputType = {
    id: number
    usuarioId: number
    rol: string
    timestamp: Date
    archivado: boolean
    _count: LogAccesoCountAggregateOutputType | null
    _avg: LogAccesoAvgAggregateOutputType | null
    _sum: LogAccesoSumAggregateOutputType | null
    _min: LogAccesoMinAggregateOutputType | null
    _max: LogAccesoMaxAggregateOutputType | null
  }

  type GetLogAccesoGroupByPayload<T extends LogAccesoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogAccesoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogAccesoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogAccesoGroupByOutputType[P]>
            : GetScalarType<T[P], LogAccesoGroupByOutputType[P]>
        }
      >
    >


  export type LogAccesoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    rol?: boolean
    timestamp?: boolean
    archivado?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["logAcceso"]>

  export type LogAccesoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    rol?: boolean
    timestamp?: boolean
    archivado?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["logAcceso"]>

  export type LogAccesoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    rol?: boolean
    timestamp?: boolean
    archivado?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["logAcceso"]>

  export type LogAccesoSelectScalar = {
    id?: boolean
    usuarioId?: boolean
    rol?: boolean
    timestamp?: boolean
    archivado?: boolean
  }

  export type LogAccesoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "usuarioId" | "rol" | "timestamp" | "archivado", ExtArgs["result"]["logAcceso"]>
  export type LogAccesoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type LogAccesoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type LogAccesoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $LogAccesoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LogAcceso"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      usuarioId: number
      rol: string
      timestamp: Date
      archivado: boolean
    }, ExtArgs["result"]["logAcceso"]>
    composites: {}
  }

  type LogAccesoGetPayload<S extends boolean | null | undefined | LogAccesoDefaultArgs> = $Result.GetResult<Prisma.$LogAccesoPayload, S>

  type LogAccesoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LogAccesoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LogAccesoCountAggregateInputType | true
    }

  export interface LogAccesoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LogAcceso'], meta: { name: 'LogAcceso' } }
    /**
     * Find zero or one LogAcceso that matches the filter.
     * @param {LogAccesoFindUniqueArgs} args - Arguments to find a LogAcceso
     * @example
     * // Get one LogAcceso
     * const logAcceso = await prisma.logAcceso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LogAccesoFindUniqueArgs>(args: SelectSubset<T, LogAccesoFindUniqueArgs<ExtArgs>>): Prisma__LogAccesoClient<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LogAcceso that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LogAccesoFindUniqueOrThrowArgs} args - Arguments to find a LogAcceso
     * @example
     * // Get one LogAcceso
     * const logAcceso = await prisma.logAcceso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LogAccesoFindUniqueOrThrowArgs>(args: SelectSubset<T, LogAccesoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LogAccesoClient<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogAcceso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAccesoFindFirstArgs} args - Arguments to find a LogAcceso
     * @example
     * // Get one LogAcceso
     * const logAcceso = await prisma.logAcceso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LogAccesoFindFirstArgs>(args?: SelectSubset<T, LogAccesoFindFirstArgs<ExtArgs>>): Prisma__LogAccesoClient<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogAcceso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAccesoFindFirstOrThrowArgs} args - Arguments to find a LogAcceso
     * @example
     * // Get one LogAcceso
     * const logAcceso = await prisma.logAcceso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LogAccesoFindFirstOrThrowArgs>(args?: SelectSubset<T, LogAccesoFindFirstOrThrowArgs<ExtArgs>>): Prisma__LogAccesoClient<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LogAccesos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAccesoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LogAccesos
     * const logAccesos = await prisma.logAcceso.findMany()
     * 
     * // Get first 10 LogAccesos
     * const logAccesos = await prisma.logAcceso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logAccesoWithIdOnly = await prisma.logAcceso.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LogAccesoFindManyArgs>(args?: SelectSubset<T, LogAccesoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LogAcceso.
     * @param {LogAccesoCreateArgs} args - Arguments to create a LogAcceso.
     * @example
     * // Create one LogAcceso
     * const LogAcceso = await prisma.logAcceso.create({
     *   data: {
     *     // ... data to create a LogAcceso
     *   }
     * })
     * 
     */
    create<T extends LogAccesoCreateArgs>(args: SelectSubset<T, LogAccesoCreateArgs<ExtArgs>>): Prisma__LogAccesoClient<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LogAccesos.
     * @param {LogAccesoCreateManyArgs} args - Arguments to create many LogAccesos.
     * @example
     * // Create many LogAccesos
     * const logAcceso = await prisma.logAcceso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LogAccesoCreateManyArgs>(args?: SelectSubset<T, LogAccesoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LogAccesos and returns the data saved in the database.
     * @param {LogAccesoCreateManyAndReturnArgs} args - Arguments to create many LogAccesos.
     * @example
     * // Create many LogAccesos
     * const logAcceso = await prisma.logAcceso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LogAccesos and only return the `id`
     * const logAccesoWithIdOnly = await prisma.logAcceso.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LogAccesoCreateManyAndReturnArgs>(args?: SelectSubset<T, LogAccesoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LogAcceso.
     * @param {LogAccesoDeleteArgs} args - Arguments to delete one LogAcceso.
     * @example
     * // Delete one LogAcceso
     * const LogAcceso = await prisma.logAcceso.delete({
     *   where: {
     *     // ... filter to delete one LogAcceso
     *   }
     * })
     * 
     */
    delete<T extends LogAccesoDeleteArgs>(args: SelectSubset<T, LogAccesoDeleteArgs<ExtArgs>>): Prisma__LogAccesoClient<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LogAcceso.
     * @param {LogAccesoUpdateArgs} args - Arguments to update one LogAcceso.
     * @example
     * // Update one LogAcceso
     * const logAcceso = await prisma.logAcceso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LogAccesoUpdateArgs>(args: SelectSubset<T, LogAccesoUpdateArgs<ExtArgs>>): Prisma__LogAccesoClient<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LogAccesos.
     * @param {LogAccesoDeleteManyArgs} args - Arguments to filter LogAccesos to delete.
     * @example
     * // Delete a few LogAccesos
     * const { count } = await prisma.logAcceso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LogAccesoDeleteManyArgs>(args?: SelectSubset<T, LogAccesoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogAccesos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAccesoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LogAccesos
     * const logAcceso = await prisma.logAcceso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LogAccesoUpdateManyArgs>(args: SelectSubset<T, LogAccesoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogAccesos and returns the data updated in the database.
     * @param {LogAccesoUpdateManyAndReturnArgs} args - Arguments to update many LogAccesos.
     * @example
     * // Update many LogAccesos
     * const logAcceso = await prisma.logAcceso.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LogAccesos and only return the `id`
     * const logAccesoWithIdOnly = await prisma.logAcceso.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LogAccesoUpdateManyAndReturnArgs>(args: SelectSubset<T, LogAccesoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LogAcceso.
     * @param {LogAccesoUpsertArgs} args - Arguments to update or create a LogAcceso.
     * @example
     * // Update or create a LogAcceso
     * const logAcceso = await prisma.logAcceso.upsert({
     *   create: {
     *     // ... data to create a LogAcceso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LogAcceso we want to update
     *   }
     * })
     */
    upsert<T extends LogAccesoUpsertArgs>(args: SelectSubset<T, LogAccesoUpsertArgs<ExtArgs>>): Prisma__LogAccesoClient<$Result.GetResult<Prisma.$LogAccesoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LogAccesos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAccesoCountArgs} args - Arguments to filter LogAccesos to count.
     * @example
     * // Count the number of LogAccesos
     * const count = await prisma.logAcceso.count({
     *   where: {
     *     // ... the filter for the LogAccesos we want to count
     *   }
     * })
    **/
    count<T extends LogAccesoCountArgs>(
      args?: Subset<T, LogAccesoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogAccesoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LogAcceso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAccesoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LogAccesoAggregateArgs>(args: Subset<T, LogAccesoAggregateArgs>): Prisma.PrismaPromise<GetLogAccesoAggregateType<T>>

    /**
     * Group by LogAcceso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAccesoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LogAccesoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogAccesoGroupByArgs['orderBy'] }
        : { orderBy?: LogAccesoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LogAccesoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogAccesoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LogAcceso model
   */
  readonly fields: LogAccesoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LogAcceso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LogAccesoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LogAcceso model
   */
  interface LogAccesoFieldRefs {
    readonly id: FieldRef<"LogAcceso", 'Int'>
    readonly usuarioId: FieldRef<"LogAcceso", 'Int'>
    readonly rol: FieldRef<"LogAcceso", 'String'>
    readonly timestamp: FieldRef<"LogAcceso", 'DateTime'>
    readonly archivado: FieldRef<"LogAcceso", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * LogAcceso findUnique
   */
  export type LogAccesoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    /**
     * Filter, which LogAcceso to fetch.
     */
    where: LogAccesoWhereUniqueInput
  }

  /**
   * LogAcceso findUniqueOrThrow
   */
  export type LogAccesoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    /**
     * Filter, which LogAcceso to fetch.
     */
    where: LogAccesoWhereUniqueInput
  }

  /**
   * LogAcceso findFirst
   */
  export type LogAccesoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    /**
     * Filter, which LogAcceso to fetch.
     */
    where?: LogAccesoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogAccesos to fetch.
     */
    orderBy?: LogAccesoOrderByWithRelationInput | LogAccesoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogAccesos.
     */
    cursor?: LogAccesoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogAccesos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogAccesos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogAccesos.
     */
    distinct?: LogAccesoScalarFieldEnum | LogAccesoScalarFieldEnum[]
  }

  /**
   * LogAcceso findFirstOrThrow
   */
  export type LogAccesoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    /**
     * Filter, which LogAcceso to fetch.
     */
    where?: LogAccesoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogAccesos to fetch.
     */
    orderBy?: LogAccesoOrderByWithRelationInput | LogAccesoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogAccesos.
     */
    cursor?: LogAccesoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogAccesos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogAccesos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogAccesos.
     */
    distinct?: LogAccesoScalarFieldEnum | LogAccesoScalarFieldEnum[]
  }

  /**
   * LogAcceso findMany
   */
  export type LogAccesoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    /**
     * Filter, which LogAccesos to fetch.
     */
    where?: LogAccesoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogAccesos to fetch.
     */
    orderBy?: LogAccesoOrderByWithRelationInput | LogAccesoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LogAccesos.
     */
    cursor?: LogAccesoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogAccesos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogAccesos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogAccesos.
     */
    distinct?: LogAccesoScalarFieldEnum | LogAccesoScalarFieldEnum[]
  }

  /**
   * LogAcceso create
   */
  export type LogAccesoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    /**
     * The data needed to create a LogAcceso.
     */
    data: XOR<LogAccesoCreateInput, LogAccesoUncheckedCreateInput>
  }

  /**
   * LogAcceso createMany
   */
  export type LogAccesoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LogAccesos.
     */
    data: LogAccesoCreateManyInput | LogAccesoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LogAcceso createManyAndReturn
   */
  export type LogAccesoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * The data used to create many LogAccesos.
     */
    data: LogAccesoCreateManyInput | LogAccesoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LogAcceso update
   */
  export type LogAccesoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    /**
     * The data needed to update a LogAcceso.
     */
    data: XOR<LogAccesoUpdateInput, LogAccesoUncheckedUpdateInput>
    /**
     * Choose, which LogAcceso to update.
     */
    where: LogAccesoWhereUniqueInput
  }

  /**
   * LogAcceso updateMany
   */
  export type LogAccesoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LogAccesos.
     */
    data: XOR<LogAccesoUpdateManyMutationInput, LogAccesoUncheckedUpdateManyInput>
    /**
     * Filter which LogAccesos to update
     */
    where?: LogAccesoWhereInput
    /**
     * Limit how many LogAccesos to update.
     */
    limit?: number
  }

  /**
   * LogAcceso updateManyAndReturn
   */
  export type LogAccesoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * The data used to update LogAccesos.
     */
    data: XOR<LogAccesoUpdateManyMutationInput, LogAccesoUncheckedUpdateManyInput>
    /**
     * Filter which LogAccesos to update
     */
    where?: LogAccesoWhereInput
    /**
     * Limit how many LogAccesos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LogAcceso upsert
   */
  export type LogAccesoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    /**
     * The filter to search for the LogAcceso to update in case it exists.
     */
    where: LogAccesoWhereUniqueInput
    /**
     * In case the LogAcceso found by the `where` argument doesn't exist, create a new LogAcceso with this data.
     */
    create: XOR<LogAccesoCreateInput, LogAccesoUncheckedCreateInput>
    /**
     * In case the LogAcceso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LogAccesoUpdateInput, LogAccesoUncheckedUpdateInput>
  }

  /**
   * LogAcceso delete
   */
  export type LogAccesoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
    /**
     * Filter which LogAcceso to delete.
     */
    where: LogAccesoWhereUniqueInput
  }

  /**
   * LogAcceso deleteMany
   */
  export type LogAccesoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogAccesos to delete
     */
    where?: LogAccesoWhereInput
    /**
     * Limit how many LogAccesos to delete.
     */
    limit?: number
  }

  /**
   * LogAcceso without action
   */
  export type LogAccesoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogAcceso
     */
    select?: LogAccesoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogAcceso
     */
    omit?: LogAccesoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LogAccesoInclude<ExtArgs> | null
  }


  /**
   * Model Categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null
    _avg: CategoriaAvgAggregateOutputType | null
    _sum: CategoriaSumAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  export type CategoriaAvgAggregateOutputType = {
    id: number | null
  }

  export type CategoriaSumAggregateOutputType = {
    id: number | null
  }

  export type CategoriaMinAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type CategoriaMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
  }

  export type CategoriaCountAggregateOutputType = {
    id: number
    nombre: number
    _all: number
  }


  export type CategoriaAvgAggregateInputType = {
    id?: true
  }

  export type CategoriaSumAggregateInputType = {
    id?: true
  }

  export type CategoriaMinAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type CategoriaMaxAggregateInputType = {
    id?: true
    nombre?: true
  }

  export type CategoriaCountAggregateInputType = {
    id?: true
    nombre?: true
    _all?: true
  }

  export type CategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categoria to aggregate.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categorias
    **/
    _count?: true | CategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriaMaxAggregateInputType
  }

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>
  }




  export type CategoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithAggregationInput | CategoriaOrderByWithAggregationInput[]
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum
    having?: CategoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriaCountAggregateInputType | true
    _avg?: CategoriaAvgAggregateInputType
    _sum?: CategoriaSumAggregateInputType
    _min?: CategoriaMinAggregateInputType
    _max?: CategoriaMaxAggregateInputType
  }

  export type CategoriaGroupByOutputType = {
    id: number
    nombre: string
    _count: CategoriaCountAggregateOutputType | null
    _avg: CategoriaAvgAggregateOutputType | null
    _sum: CategoriaSumAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  type GetCategoriaGroupByPayload<T extends CategoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
        }
      >
    >


  export type CategoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    productos?: boolean | Categoria$productosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectScalar = {
    id?: boolean
    nombre?: boolean
  }

  export type CategoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre", ExtArgs["result"]["categoria"]>
  export type CategoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | Categoria$productosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoriaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoriaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categoria"
    objects: {
      productos: Prisma.$ProductoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
    }, ExtArgs["result"]["categoria"]>
    composites: {}
  }

  type CategoriaGetPayload<S extends boolean | null | undefined | CategoriaDefaultArgs> = $Result.GetResult<Prisma.$CategoriaPayload, S>

  type CategoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriaCountAggregateInputType | true
    }

  export interface CategoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categoria'], meta: { name: 'Categoria' } }
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {CategoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriaFindUniqueArgs>(args: SelectSubset<T, CategoriaFindUniqueArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriaFindFirstArgs>(args?: SelectSubset<T, CategoriaFindFirstArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriaWithIdOnly = await prisma.categoria.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriaFindManyArgs>(args?: SelectSubset<T, CategoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria.
     * @param {CategoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     * 
     */
    create<T extends CategoriaCreateArgs>(args: SelectSubset<T, CategoriaCreateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {CategoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriaCreateManyArgs>(args?: SelectSubset<T, CategoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {CategoriaCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoriaCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categoria.
     * @param {CategoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     * 
     */
    delete<T extends CategoriaDeleteArgs>(args: SelectSubset<T, CategoriaDeleteArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria.
     * @param {CategoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriaUpdateArgs>(args: SelectSubset<T, CategoriaUpdateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {CategoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriaDeleteManyArgs>(args?: SelectSubset<T, CategoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriaUpdateManyArgs>(args: SelectSubset<T, CategoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias and returns the data updated in the database.
     * @param {CategoriaUpdateManyAndReturnArgs} args - Arguments to update many Categorias.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoriaUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoriaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categoria.
     * @param {CategoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends CategoriaUpsertArgs>(args: SelectSubset<T, CategoriaUpsertArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends CategoriaCountArgs>(
      args?: Subset<T, CategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriaAggregateArgs>(args: Subset<T, CategoriaAggregateArgs>): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriaGroupByArgs['orderBy'] }
        : { orderBy?: CategoriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categoria model
   */
  readonly fields: CategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productos<T extends Categoria$productosArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$productosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categoria model
   */
  interface CategoriaFieldRefs {
    readonly id: FieldRef<"Categoria", 'Int'>
    readonly nombre: FieldRef<"Categoria", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Categoria findUnique
   */
  export type CategoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findUniqueOrThrow
   */
  export type CategoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findFirst
   */
  export type CategoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findFirstOrThrow
   */
  export type CategoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findMany
   */
  export type CategoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria create
   */
  export type CategoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Categoria.
     */
    data: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
  }

  /**
   * Categoria createMany
   */
  export type CategoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria createManyAndReturn
   */
  export type CategoriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria update
   */
  export type CategoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Categoria.
     */
    data: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
    /**
     * Choose, which Categoria to update.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria updateMany
   */
  export type CategoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria updateManyAndReturn
   */
  export type CategoriaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria upsert
   */
  export type CategoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Categoria to update in case it exists.
     */
    where: CategoriaWhereUniqueInput
    /**
     * In case the Categoria found by the `where` argument doesn't exist, create a new Categoria with this data.
     */
    create: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
    /**
     * In case the Categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
  }

  /**
   * Categoria delete
   */
  export type CategoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter which Categoria to delete.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria deleteMany
   */
  export type CategoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to delete.
     */
    limit?: number
  }

  /**
   * Categoria.productos
   */
  export type Categoria$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    cursor?: ProductoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Categoria without action
   */
  export type CategoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
  }


  /**
   * Model Producto
   */

  export type AggregateProducto = {
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  export type ProductoAvgAggregateOutputType = {
    id: number | null
    precio: Decimal | null
    stock: number | null
    categoriaId: number | null
  }

  export type ProductoSumAggregateOutputType = {
    id: number | null
    precio: Decimal | null
    stock: number | null
    categoriaId: number | null
  }

  export type ProductoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    marca: string | null
    precio: Decimal | null
    stock: number | null
    fechaVencimiento: Date | null
    activo: boolean | null
    categoriaId: number | null
    creadoEn: Date | null
  }

  export type ProductoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    marca: string | null
    precio: Decimal | null
    stock: number | null
    fechaVencimiento: Date | null
    activo: boolean | null
    categoriaId: number | null
    creadoEn: Date | null
  }

  export type ProductoCountAggregateOutputType = {
    id: number
    nombre: number
    marca: number
    precio: number
    stock: number
    fechaVencimiento: number
    activo: number
    categoriaId: number
    creadoEn: number
    _all: number
  }


  export type ProductoAvgAggregateInputType = {
    id?: true
    precio?: true
    stock?: true
    categoriaId?: true
  }

  export type ProductoSumAggregateInputType = {
    id?: true
    precio?: true
    stock?: true
    categoriaId?: true
  }

  export type ProductoMinAggregateInputType = {
    id?: true
    nombre?: true
    marca?: true
    precio?: true
    stock?: true
    fechaVencimiento?: true
    activo?: true
    categoriaId?: true
    creadoEn?: true
  }

  export type ProductoMaxAggregateInputType = {
    id?: true
    nombre?: true
    marca?: true
    precio?: true
    stock?: true
    fechaVencimiento?: true
    activo?: true
    categoriaId?: true
    creadoEn?: true
  }

  export type ProductoCountAggregateInputType = {
    id?: true
    nombre?: true
    marca?: true
    precio?: true
    stock?: true
    fechaVencimiento?: true
    activo?: true
    categoriaId?: true
    creadoEn?: true
    _all?: true
  }

  export type ProductoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Producto to aggregate.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Productos
    **/
    _count?: true | ProductoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoMaxAggregateInputType
  }

  export type GetProductoAggregateType<T extends ProductoAggregateArgs> = {
        [P in keyof T & keyof AggregateProducto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducto[P]>
      : GetScalarType<T[P], AggregateProducto[P]>
  }




  export type ProductoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithAggregationInput | ProductoOrderByWithAggregationInput[]
    by: ProductoScalarFieldEnum[] | ProductoScalarFieldEnum
    having?: ProductoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoCountAggregateInputType | true
    _avg?: ProductoAvgAggregateInputType
    _sum?: ProductoSumAggregateInputType
    _min?: ProductoMinAggregateInputType
    _max?: ProductoMaxAggregateInputType
  }

  export type ProductoGroupByOutputType = {
    id: number
    nombre: string
    marca: string
    precio: Decimal
    stock: number
    fechaVencimiento: Date | null
    activo: boolean
    categoriaId: number
    creadoEn: Date
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  type GetProductoGroupByPayload<T extends ProductoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoGroupByOutputType[P]>
        }
      >
    >


  export type ProductoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    marca?: boolean
    precio?: boolean
    stock?: boolean
    fechaVencimiento?: boolean
    activo?: boolean
    categoriaId?: boolean
    creadoEn?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    detallesVenta?: boolean | Producto$detallesVentaArgs<ExtArgs>
    entradasMercaderia?: boolean | Producto$entradasMercaderiaArgs<ExtArgs>
    bajas?: boolean | Producto$bajasArgs<ExtArgs>
    solicitudes?: boolean | Producto$solicitudesArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    marca?: boolean
    precio?: boolean
    stock?: boolean
    fechaVencimiento?: boolean
    activo?: boolean
    categoriaId?: boolean
    creadoEn?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    marca?: boolean
    precio?: boolean
    stock?: boolean
    fechaVencimiento?: boolean
    activo?: boolean
    categoriaId?: boolean
    creadoEn?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectScalar = {
    id?: boolean
    nombre?: boolean
    marca?: boolean
    precio?: boolean
    stock?: boolean
    fechaVencimiento?: boolean
    activo?: boolean
    categoriaId?: boolean
    creadoEn?: boolean
  }

  export type ProductoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "marca" | "precio" | "stock" | "fechaVencimiento" | "activo" | "categoriaId" | "creadoEn", ExtArgs["result"]["producto"]>
  export type ProductoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    detallesVenta?: boolean | Producto$detallesVentaArgs<ExtArgs>
    entradasMercaderia?: boolean | Producto$entradasMercaderiaArgs<ExtArgs>
    bajas?: boolean | Producto$bajasArgs<ExtArgs>
    solicitudes?: boolean | Producto$solicitudesArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }
  export type ProductoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }

  export type $ProductoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Producto"
    objects: {
      categoria: Prisma.$CategoriaPayload<ExtArgs>
      detallesVenta: Prisma.$DetalleVentaPayload<ExtArgs>[]
      entradasMercaderia: Prisma.$EntradaMercaderiaPayload<ExtArgs>[]
      bajas: Prisma.$BajaInventarioPayload<ExtArgs>[]
      solicitudes: Prisma.$SolicitudReposicionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      marca: string
      precio: Prisma.Decimal
      stock: number
      fechaVencimiento: Date | null
      activo: boolean
      categoriaId: number
      creadoEn: Date
    }, ExtArgs["result"]["producto"]>
    composites: {}
  }

  type ProductoGetPayload<S extends boolean | null | undefined | ProductoDefaultArgs> = $Result.GetResult<Prisma.$ProductoPayload, S>

  type ProductoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoCountAggregateInputType | true
    }

  export interface ProductoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Producto'], meta: { name: 'Producto' } }
    /**
     * Find zero or one Producto that matches the filter.
     * @param {ProductoFindUniqueArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoFindUniqueArgs>(args: SelectSubset<T, ProductoFindUniqueArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Producto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductoFindUniqueOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoFindFirstArgs>(args?: SelectSubset<T, ProductoFindFirstArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productos
     * const productos = await prisma.producto.findMany()
     * 
     * // Get first 10 Productos
     * const productos = await prisma.producto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productoWithIdOnly = await prisma.producto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductoFindManyArgs>(args?: SelectSubset<T, ProductoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Producto.
     * @param {ProductoCreateArgs} args - Arguments to create a Producto.
     * @example
     * // Create one Producto
     * const Producto = await prisma.producto.create({
     *   data: {
     *     // ... data to create a Producto
     *   }
     * })
     * 
     */
    create<T extends ProductoCreateArgs>(args: SelectSubset<T, ProductoCreateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productos.
     * @param {ProductoCreateManyArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoCreateManyArgs>(args?: SelectSubset<T, ProductoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Productos and returns the data saved in the database.
     * @param {ProductoCreateManyAndReturnArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Productos and only return the `id`
     * const productoWithIdOnly = await prisma.producto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Producto.
     * @param {ProductoDeleteArgs} args - Arguments to delete one Producto.
     * @example
     * // Delete one Producto
     * const Producto = await prisma.producto.delete({
     *   where: {
     *     // ... filter to delete one Producto
     *   }
     * })
     * 
     */
    delete<T extends ProductoDeleteArgs>(args: SelectSubset<T, ProductoDeleteArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Producto.
     * @param {ProductoUpdateArgs} args - Arguments to update one Producto.
     * @example
     * // Update one Producto
     * const producto = await prisma.producto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoUpdateArgs>(args: SelectSubset<T, ProductoUpdateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productos.
     * @param {ProductoDeleteManyArgs} args - Arguments to filter Productos to delete.
     * @example
     * // Delete a few Productos
     * const { count } = await prisma.producto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoDeleteManyArgs>(args?: SelectSubset<T, ProductoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoUpdateManyArgs>(args: SelectSubset<T, ProductoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos and returns the data updated in the database.
     * @param {ProductoUpdateManyAndReturnArgs} args - Arguments to update many Productos.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Productos and only return the `id`
     * const productoWithIdOnly = await prisma.producto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Producto.
     * @param {ProductoUpsertArgs} args - Arguments to update or create a Producto.
     * @example
     * // Update or create a Producto
     * const producto = await prisma.producto.upsert({
     *   create: {
     *     // ... data to create a Producto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Producto we want to update
     *   }
     * })
     */
    upsert<T extends ProductoUpsertArgs>(args: SelectSubset<T, ProductoUpsertArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoCountArgs} args - Arguments to filter Productos to count.
     * @example
     * // Count the number of Productos
     * const count = await prisma.producto.count({
     *   where: {
     *     // ... the filter for the Productos we want to count
     *   }
     * })
    **/
    count<T extends ProductoCountArgs>(
      args?: Subset<T, ProductoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductoAggregateArgs>(args: Subset<T, ProductoAggregateArgs>): Prisma.PrismaPromise<GetProductoAggregateType<T>>

    /**
     * Group by Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoGroupByArgs['orderBy'] }
        : { orderBy?: ProductoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Producto model
   */
  readonly fields: ProductoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Producto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categoria<T extends CategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoriaDefaultArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    detallesVenta<T extends Producto$detallesVentaArgs<ExtArgs> = {}>(args?: Subset<T, Producto$detallesVentaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entradasMercaderia<T extends Producto$entradasMercaderiaArgs<ExtArgs> = {}>(args?: Subset<T, Producto$entradasMercaderiaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bajas<T extends Producto$bajasArgs<ExtArgs> = {}>(args?: Subset<T, Producto$bajasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solicitudes<T extends Producto$solicitudesArgs<ExtArgs> = {}>(args?: Subset<T, Producto$solicitudesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Producto model
   */
  interface ProductoFieldRefs {
    readonly id: FieldRef<"Producto", 'Int'>
    readonly nombre: FieldRef<"Producto", 'String'>
    readonly marca: FieldRef<"Producto", 'String'>
    readonly precio: FieldRef<"Producto", 'Decimal'>
    readonly stock: FieldRef<"Producto", 'Int'>
    readonly fechaVencimiento: FieldRef<"Producto", 'DateTime'>
    readonly activo: FieldRef<"Producto", 'Boolean'>
    readonly categoriaId: FieldRef<"Producto", 'Int'>
    readonly creadoEn: FieldRef<"Producto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Producto findUnique
   */
  export type ProductoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findUniqueOrThrow
   */
  export type ProductoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findFirst
   */
  export type ProductoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findFirstOrThrow
   */
  export type ProductoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findMany
   */
  export type ProductoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto create
   */
  export type ProductoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to create a Producto.
     */
    data: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
  }

  /**
   * Producto createMany
   */
  export type ProductoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Producto createManyAndReturn
   */
  export type ProductoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Producto update
   */
  export type ProductoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to update a Producto.
     */
    data: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
    /**
     * Choose, which Producto to update.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto updateMany
   */
  export type ProductoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to update.
     */
    limit?: number
  }

  /**
   * Producto updateManyAndReturn
   */
  export type ProductoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Producto upsert
   */
  export type ProductoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The filter to search for the Producto to update in case it exists.
     */
    where: ProductoWhereUniqueInput
    /**
     * In case the Producto found by the `where` argument doesn't exist, create a new Producto with this data.
     */
    create: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
    /**
     * In case the Producto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
  }

  /**
   * Producto delete
   */
  export type ProductoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter which Producto to delete.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto deleteMany
   */
  export type ProductoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Productos to delete
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to delete.
     */
    limit?: number
  }

  /**
   * Producto.detallesVenta
   */
  export type Producto$detallesVentaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    where?: DetalleVentaWhereInput
    orderBy?: DetalleVentaOrderByWithRelationInput | DetalleVentaOrderByWithRelationInput[]
    cursor?: DetalleVentaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DetalleVentaScalarFieldEnum | DetalleVentaScalarFieldEnum[]
  }

  /**
   * Producto.entradasMercaderia
   */
  export type Producto$entradasMercaderiaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    where?: EntradaMercaderiaWhereInput
    orderBy?: EntradaMercaderiaOrderByWithRelationInput | EntradaMercaderiaOrderByWithRelationInput[]
    cursor?: EntradaMercaderiaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntradaMercaderiaScalarFieldEnum | EntradaMercaderiaScalarFieldEnum[]
  }

  /**
   * Producto.bajas
   */
  export type Producto$bajasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    where?: BajaInventarioWhereInput
    orderBy?: BajaInventarioOrderByWithRelationInput | BajaInventarioOrderByWithRelationInput[]
    cursor?: BajaInventarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BajaInventarioScalarFieldEnum | BajaInventarioScalarFieldEnum[]
  }

  /**
   * Producto.solicitudes
   */
  export type Producto$solicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    where?: SolicitudReposicionWhereInput
    orderBy?: SolicitudReposicionOrderByWithRelationInput | SolicitudReposicionOrderByWithRelationInput[]
    cursor?: SolicitudReposicionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitudReposicionScalarFieldEnum | SolicitudReposicionScalarFieldEnum[]
  }

  /**
   * Producto without action
   */
  export type ProductoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
  }


  /**
   * Model Proveedor
   */

  export type AggregateProveedor = {
    _count: ProveedorCountAggregateOutputType | null
    _avg: ProveedorAvgAggregateOutputType | null
    _sum: ProveedorSumAggregateOutputType | null
    _min: ProveedorMinAggregateOutputType | null
    _max: ProveedorMaxAggregateOutputType | null
  }

  export type ProveedorAvgAggregateOutputType = {
    id: number | null
  }

  export type ProveedorSumAggregateOutputType = {
    id: number | null
  }

  export type ProveedorMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    ruc: string | null
    contacto: string | null
    activo: boolean | null
    creadoEn: Date | null
  }

  export type ProveedorMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    ruc: string | null
    contacto: string | null
    activo: boolean | null
    creadoEn: Date | null
  }

  export type ProveedorCountAggregateOutputType = {
    id: number
    nombre: number
    ruc: number
    contacto: number
    activo: number
    creadoEn: number
    _all: number
  }


  export type ProveedorAvgAggregateInputType = {
    id?: true
  }

  export type ProveedorSumAggregateInputType = {
    id?: true
  }

  export type ProveedorMinAggregateInputType = {
    id?: true
    nombre?: true
    ruc?: true
    contacto?: true
    activo?: true
    creadoEn?: true
  }

  export type ProveedorMaxAggregateInputType = {
    id?: true
    nombre?: true
    ruc?: true
    contacto?: true
    activo?: true
    creadoEn?: true
  }

  export type ProveedorCountAggregateInputType = {
    id?: true
    nombre?: true
    ruc?: true
    contacto?: true
    activo?: true
    creadoEn?: true
    _all?: true
  }

  export type ProveedorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proveedor to aggregate.
     */
    where?: ProveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proveedors to fetch.
     */
    orderBy?: ProveedorOrderByWithRelationInput | ProveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Proveedors
    **/
    _count?: true | ProveedorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProveedorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProveedorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProveedorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProveedorMaxAggregateInputType
  }

  export type GetProveedorAggregateType<T extends ProveedorAggregateArgs> = {
        [P in keyof T & keyof AggregateProveedor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProveedor[P]>
      : GetScalarType<T[P], AggregateProveedor[P]>
  }




  export type ProveedorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProveedorWhereInput
    orderBy?: ProveedorOrderByWithAggregationInput | ProveedorOrderByWithAggregationInput[]
    by: ProveedorScalarFieldEnum[] | ProveedorScalarFieldEnum
    having?: ProveedorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProveedorCountAggregateInputType | true
    _avg?: ProveedorAvgAggregateInputType
    _sum?: ProveedorSumAggregateInputType
    _min?: ProveedorMinAggregateInputType
    _max?: ProveedorMaxAggregateInputType
  }

  export type ProveedorGroupByOutputType = {
    id: number
    nombre: string
    ruc: string
    contacto: string
    activo: boolean
    creadoEn: Date
    _count: ProveedorCountAggregateOutputType | null
    _avg: ProveedorAvgAggregateOutputType | null
    _sum: ProveedorSumAggregateOutputType | null
    _min: ProveedorMinAggregateOutputType | null
    _max: ProveedorMaxAggregateOutputType | null
  }

  type GetProveedorGroupByPayload<T extends ProveedorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProveedorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProveedorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProveedorGroupByOutputType[P]>
            : GetScalarType<T[P], ProveedorGroupByOutputType[P]>
        }
      >
    >


  export type ProveedorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    ruc?: boolean
    contacto?: boolean
    activo?: boolean
    creadoEn?: boolean
    entradasMercaderia?: boolean | Proveedor$entradasMercaderiaArgs<ExtArgs>
    solicitudes?: boolean | Proveedor$solicitudesArgs<ExtArgs>
    _count?: boolean | ProveedorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proveedor"]>

  export type ProveedorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    ruc?: boolean
    contacto?: boolean
    activo?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["proveedor"]>

  export type ProveedorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    ruc?: boolean
    contacto?: boolean
    activo?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["proveedor"]>

  export type ProveedorSelectScalar = {
    id?: boolean
    nombre?: boolean
    ruc?: boolean
    contacto?: boolean
    activo?: boolean
    creadoEn?: boolean
  }

  export type ProveedorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "ruc" | "contacto" | "activo" | "creadoEn", ExtArgs["result"]["proveedor"]>
  export type ProveedorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entradasMercaderia?: boolean | Proveedor$entradasMercaderiaArgs<ExtArgs>
    solicitudes?: boolean | Proveedor$solicitudesArgs<ExtArgs>
    _count?: boolean | ProveedorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProveedorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProveedorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProveedorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Proveedor"
    objects: {
      entradasMercaderia: Prisma.$EntradaMercaderiaPayload<ExtArgs>[]
      solicitudes: Prisma.$SolicitudReposicionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      ruc: string
      contacto: string
      activo: boolean
      creadoEn: Date
    }, ExtArgs["result"]["proveedor"]>
    composites: {}
  }

  type ProveedorGetPayload<S extends boolean | null | undefined | ProveedorDefaultArgs> = $Result.GetResult<Prisma.$ProveedorPayload, S>

  type ProveedorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProveedorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProveedorCountAggregateInputType | true
    }

  export interface ProveedorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Proveedor'], meta: { name: 'Proveedor' } }
    /**
     * Find zero or one Proveedor that matches the filter.
     * @param {ProveedorFindUniqueArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProveedorFindUniqueArgs>(args: SelectSubset<T, ProveedorFindUniqueArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proveedor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProveedorFindUniqueOrThrowArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProveedorFindUniqueOrThrowArgs>(args: SelectSubset<T, ProveedorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proveedor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorFindFirstArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProveedorFindFirstArgs>(args?: SelectSubset<T, ProveedorFindFirstArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proveedor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorFindFirstOrThrowArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProveedorFindFirstOrThrowArgs>(args?: SelectSubset<T, ProveedorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proveedors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proveedors
     * const proveedors = await prisma.proveedor.findMany()
     * 
     * // Get first 10 Proveedors
     * const proveedors = await prisma.proveedor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proveedorWithIdOnly = await prisma.proveedor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProveedorFindManyArgs>(args?: SelectSubset<T, ProveedorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proveedor.
     * @param {ProveedorCreateArgs} args - Arguments to create a Proveedor.
     * @example
     * // Create one Proveedor
     * const Proveedor = await prisma.proveedor.create({
     *   data: {
     *     // ... data to create a Proveedor
     *   }
     * })
     * 
     */
    create<T extends ProveedorCreateArgs>(args: SelectSubset<T, ProveedorCreateArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proveedors.
     * @param {ProveedorCreateManyArgs} args - Arguments to create many Proveedors.
     * @example
     * // Create many Proveedors
     * const proveedor = await prisma.proveedor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProveedorCreateManyArgs>(args?: SelectSubset<T, ProveedorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Proveedors and returns the data saved in the database.
     * @param {ProveedorCreateManyAndReturnArgs} args - Arguments to create many Proveedors.
     * @example
     * // Create many Proveedors
     * const proveedor = await prisma.proveedor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Proveedors and only return the `id`
     * const proveedorWithIdOnly = await prisma.proveedor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProveedorCreateManyAndReturnArgs>(args?: SelectSubset<T, ProveedorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Proveedor.
     * @param {ProveedorDeleteArgs} args - Arguments to delete one Proveedor.
     * @example
     * // Delete one Proveedor
     * const Proveedor = await prisma.proveedor.delete({
     *   where: {
     *     // ... filter to delete one Proveedor
     *   }
     * })
     * 
     */
    delete<T extends ProveedorDeleteArgs>(args: SelectSubset<T, ProveedorDeleteArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proveedor.
     * @param {ProveedorUpdateArgs} args - Arguments to update one Proveedor.
     * @example
     * // Update one Proveedor
     * const proveedor = await prisma.proveedor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProveedorUpdateArgs>(args: SelectSubset<T, ProveedorUpdateArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proveedors.
     * @param {ProveedorDeleteManyArgs} args - Arguments to filter Proveedors to delete.
     * @example
     * // Delete a few Proveedors
     * const { count } = await prisma.proveedor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProveedorDeleteManyArgs>(args?: SelectSubset<T, ProveedorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proveedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proveedors
     * const proveedor = await prisma.proveedor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProveedorUpdateManyArgs>(args: SelectSubset<T, ProveedorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proveedors and returns the data updated in the database.
     * @param {ProveedorUpdateManyAndReturnArgs} args - Arguments to update many Proveedors.
     * @example
     * // Update many Proveedors
     * const proveedor = await prisma.proveedor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Proveedors and only return the `id`
     * const proveedorWithIdOnly = await prisma.proveedor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProveedorUpdateManyAndReturnArgs>(args: SelectSubset<T, ProveedorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Proveedor.
     * @param {ProveedorUpsertArgs} args - Arguments to update or create a Proveedor.
     * @example
     * // Update or create a Proveedor
     * const proveedor = await prisma.proveedor.upsert({
     *   create: {
     *     // ... data to create a Proveedor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proveedor we want to update
     *   }
     * })
     */
    upsert<T extends ProveedorUpsertArgs>(args: SelectSubset<T, ProveedorUpsertArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proveedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorCountArgs} args - Arguments to filter Proveedors to count.
     * @example
     * // Count the number of Proveedors
     * const count = await prisma.proveedor.count({
     *   where: {
     *     // ... the filter for the Proveedors we want to count
     *   }
     * })
    **/
    count<T extends ProveedorCountArgs>(
      args?: Subset<T, ProveedorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProveedorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proveedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProveedorAggregateArgs>(args: Subset<T, ProveedorAggregateArgs>): Prisma.PrismaPromise<GetProveedorAggregateType<T>>

    /**
     * Group by Proveedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProveedorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProveedorGroupByArgs['orderBy'] }
        : { orderBy?: ProveedorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProveedorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProveedorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Proveedor model
   */
  readonly fields: ProveedorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proveedor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProveedorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entradasMercaderia<T extends Proveedor$entradasMercaderiaArgs<ExtArgs> = {}>(args?: Subset<T, Proveedor$entradasMercaderiaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solicitudes<T extends Proveedor$solicitudesArgs<ExtArgs> = {}>(args?: Subset<T, Proveedor$solicitudesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Proveedor model
   */
  interface ProveedorFieldRefs {
    readonly id: FieldRef<"Proveedor", 'Int'>
    readonly nombre: FieldRef<"Proveedor", 'String'>
    readonly ruc: FieldRef<"Proveedor", 'String'>
    readonly contacto: FieldRef<"Proveedor", 'String'>
    readonly activo: FieldRef<"Proveedor", 'Boolean'>
    readonly creadoEn: FieldRef<"Proveedor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Proveedor findUnique
   */
  export type ProveedorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedor to fetch.
     */
    where: ProveedorWhereUniqueInput
  }

  /**
   * Proveedor findUniqueOrThrow
   */
  export type ProveedorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedor to fetch.
     */
    where: ProveedorWhereUniqueInput
  }

  /**
   * Proveedor findFirst
   */
  export type ProveedorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedor to fetch.
     */
    where?: ProveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proveedors to fetch.
     */
    orderBy?: ProveedorOrderByWithRelationInput | ProveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proveedors.
     */
    cursor?: ProveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * Proveedor findFirstOrThrow
   */
  export type ProveedorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedor to fetch.
     */
    where?: ProveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proveedors to fetch.
     */
    orderBy?: ProveedorOrderByWithRelationInput | ProveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proveedors.
     */
    cursor?: ProveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * Proveedor findMany
   */
  export type ProveedorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter, which Proveedors to fetch.
     */
    where?: ProveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proveedors to fetch.
     */
    orderBy?: ProveedorOrderByWithRelationInput | ProveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Proveedors.
     */
    cursor?: ProveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * Proveedor create
   */
  export type ProveedorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * The data needed to create a Proveedor.
     */
    data: XOR<ProveedorCreateInput, ProveedorUncheckedCreateInput>
  }

  /**
   * Proveedor createMany
   */
  export type ProveedorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Proveedors.
     */
    data: ProveedorCreateManyInput | ProveedorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proveedor createManyAndReturn
   */
  export type ProveedorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * The data used to create many Proveedors.
     */
    data: ProveedorCreateManyInput | ProveedorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proveedor update
   */
  export type ProveedorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * The data needed to update a Proveedor.
     */
    data: XOR<ProveedorUpdateInput, ProveedorUncheckedUpdateInput>
    /**
     * Choose, which Proveedor to update.
     */
    where: ProveedorWhereUniqueInput
  }

  /**
   * Proveedor updateMany
   */
  export type ProveedorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Proveedors.
     */
    data: XOR<ProveedorUpdateManyMutationInput, ProveedorUncheckedUpdateManyInput>
    /**
     * Filter which Proveedors to update
     */
    where?: ProveedorWhereInput
    /**
     * Limit how many Proveedors to update.
     */
    limit?: number
  }

  /**
   * Proveedor updateManyAndReturn
   */
  export type ProveedorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * The data used to update Proveedors.
     */
    data: XOR<ProveedorUpdateManyMutationInput, ProveedorUncheckedUpdateManyInput>
    /**
     * Filter which Proveedors to update
     */
    where?: ProveedorWhereInput
    /**
     * Limit how many Proveedors to update.
     */
    limit?: number
  }

  /**
   * Proveedor upsert
   */
  export type ProveedorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * The filter to search for the Proveedor to update in case it exists.
     */
    where: ProveedorWhereUniqueInput
    /**
     * In case the Proveedor found by the `where` argument doesn't exist, create a new Proveedor with this data.
     */
    create: XOR<ProveedorCreateInput, ProveedorUncheckedCreateInput>
    /**
     * In case the Proveedor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProveedorUpdateInput, ProveedorUncheckedUpdateInput>
  }

  /**
   * Proveedor delete
   */
  export type ProveedorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    /**
     * Filter which Proveedor to delete.
     */
    where: ProveedorWhereUniqueInput
  }

  /**
   * Proveedor deleteMany
   */
  export type ProveedorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proveedors to delete
     */
    where?: ProveedorWhereInput
    /**
     * Limit how many Proveedors to delete.
     */
    limit?: number
  }

  /**
   * Proveedor.entradasMercaderia
   */
  export type Proveedor$entradasMercaderiaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    where?: EntradaMercaderiaWhereInput
    orderBy?: EntradaMercaderiaOrderByWithRelationInput | EntradaMercaderiaOrderByWithRelationInput[]
    cursor?: EntradaMercaderiaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntradaMercaderiaScalarFieldEnum | EntradaMercaderiaScalarFieldEnum[]
  }

  /**
   * Proveedor.solicitudes
   */
  export type Proveedor$solicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    where?: SolicitudReposicionWhereInput
    orderBy?: SolicitudReposicionOrderByWithRelationInput | SolicitudReposicionOrderByWithRelationInput[]
    cursor?: SolicitudReposicionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitudReposicionScalarFieldEnum | SolicitudReposicionScalarFieldEnum[]
  }

  /**
   * Proveedor without action
   */
  export type ProveedorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
  }


  /**
   * Model ConfigSistema
   */

  export type AggregateConfigSistema = {
    _count: ConfigSistemaCountAggregateOutputType | null
    _min: ConfigSistemaMinAggregateOutputType | null
    _max: ConfigSistemaMaxAggregateOutputType | null
  }

  export type ConfigSistemaMinAggregateOutputType = {
    clave: string | null
    valor: string | null
  }

  export type ConfigSistemaMaxAggregateOutputType = {
    clave: string | null
    valor: string | null
  }

  export type ConfigSistemaCountAggregateOutputType = {
    clave: number
    valor: number
    _all: number
  }


  export type ConfigSistemaMinAggregateInputType = {
    clave?: true
    valor?: true
  }

  export type ConfigSistemaMaxAggregateInputType = {
    clave?: true
    valor?: true
  }

  export type ConfigSistemaCountAggregateInputType = {
    clave?: true
    valor?: true
    _all?: true
  }

  export type ConfigSistemaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConfigSistema to aggregate.
     */
    where?: ConfigSistemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConfigSistemas to fetch.
     */
    orderBy?: ConfigSistemaOrderByWithRelationInput | ConfigSistemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfigSistemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfigSistemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfigSistemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConfigSistemas
    **/
    _count?: true | ConfigSistemaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfigSistemaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfigSistemaMaxAggregateInputType
  }

  export type GetConfigSistemaAggregateType<T extends ConfigSistemaAggregateArgs> = {
        [P in keyof T & keyof AggregateConfigSistema]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfigSistema[P]>
      : GetScalarType<T[P], AggregateConfigSistema[P]>
  }




  export type ConfigSistemaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfigSistemaWhereInput
    orderBy?: ConfigSistemaOrderByWithAggregationInput | ConfigSistemaOrderByWithAggregationInput[]
    by: ConfigSistemaScalarFieldEnum[] | ConfigSistemaScalarFieldEnum
    having?: ConfigSistemaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfigSistemaCountAggregateInputType | true
    _min?: ConfigSistemaMinAggregateInputType
    _max?: ConfigSistemaMaxAggregateInputType
  }

  export type ConfigSistemaGroupByOutputType = {
    clave: string
    valor: string
    _count: ConfigSistemaCountAggregateOutputType | null
    _min: ConfigSistemaMinAggregateOutputType | null
    _max: ConfigSistemaMaxAggregateOutputType | null
  }

  type GetConfigSistemaGroupByPayload<T extends ConfigSistemaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfigSistemaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfigSistemaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfigSistemaGroupByOutputType[P]>
            : GetScalarType<T[P], ConfigSistemaGroupByOutputType[P]>
        }
      >
    >


  export type ConfigSistemaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clave?: boolean
    valor?: boolean
  }, ExtArgs["result"]["configSistema"]>

  export type ConfigSistemaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clave?: boolean
    valor?: boolean
  }, ExtArgs["result"]["configSistema"]>

  export type ConfigSistemaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clave?: boolean
    valor?: boolean
  }, ExtArgs["result"]["configSistema"]>

  export type ConfigSistemaSelectScalar = {
    clave?: boolean
    valor?: boolean
  }

  export type ConfigSistemaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"clave" | "valor", ExtArgs["result"]["configSistema"]>

  export type $ConfigSistemaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConfigSistema"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      clave: string
      valor: string
    }, ExtArgs["result"]["configSistema"]>
    composites: {}
  }

  type ConfigSistemaGetPayload<S extends boolean | null | undefined | ConfigSistemaDefaultArgs> = $Result.GetResult<Prisma.$ConfigSistemaPayload, S>

  type ConfigSistemaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConfigSistemaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConfigSistemaCountAggregateInputType | true
    }

  export interface ConfigSistemaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConfigSistema'], meta: { name: 'ConfigSistema' } }
    /**
     * Find zero or one ConfigSistema that matches the filter.
     * @param {ConfigSistemaFindUniqueArgs} args - Arguments to find a ConfigSistema
     * @example
     * // Get one ConfigSistema
     * const configSistema = await prisma.configSistema.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfigSistemaFindUniqueArgs>(args: SelectSubset<T, ConfigSistemaFindUniqueArgs<ExtArgs>>): Prisma__ConfigSistemaClient<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConfigSistema that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConfigSistemaFindUniqueOrThrowArgs} args - Arguments to find a ConfigSistema
     * @example
     * // Get one ConfigSistema
     * const configSistema = await prisma.configSistema.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfigSistemaFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfigSistemaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfigSistemaClient<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConfigSistema that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigSistemaFindFirstArgs} args - Arguments to find a ConfigSistema
     * @example
     * // Get one ConfigSistema
     * const configSistema = await prisma.configSistema.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfigSistemaFindFirstArgs>(args?: SelectSubset<T, ConfigSistemaFindFirstArgs<ExtArgs>>): Prisma__ConfigSistemaClient<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConfigSistema that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigSistemaFindFirstOrThrowArgs} args - Arguments to find a ConfigSistema
     * @example
     * // Get one ConfigSistema
     * const configSistema = await prisma.configSistema.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfigSistemaFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfigSistemaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfigSistemaClient<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConfigSistemas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigSistemaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConfigSistemas
     * const configSistemas = await prisma.configSistema.findMany()
     * 
     * // Get first 10 ConfigSistemas
     * const configSistemas = await prisma.configSistema.findMany({ take: 10 })
     * 
     * // Only select the `clave`
     * const configSistemaWithClaveOnly = await prisma.configSistema.findMany({ select: { clave: true } })
     * 
     */
    findMany<T extends ConfigSistemaFindManyArgs>(args?: SelectSubset<T, ConfigSistemaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConfigSistema.
     * @param {ConfigSistemaCreateArgs} args - Arguments to create a ConfigSistema.
     * @example
     * // Create one ConfigSistema
     * const ConfigSistema = await prisma.configSistema.create({
     *   data: {
     *     // ... data to create a ConfigSistema
     *   }
     * })
     * 
     */
    create<T extends ConfigSistemaCreateArgs>(args: SelectSubset<T, ConfigSistemaCreateArgs<ExtArgs>>): Prisma__ConfigSistemaClient<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConfigSistemas.
     * @param {ConfigSistemaCreateManyArgs} args - Arguments to create many ConfigSistemas.
     * @example
     * // Create many ConfigSistemas
     * const configSistema = await prisma.configSistema.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfigSistemaCreateManyArgs>(args?: SelectSubset<T, ConfigSistemaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConfigSistemas and returns the data saved in the database.
     * @param {ConfigSistemaCreateManyAndReturnArgs} args - Arguments to create many ConfigSistemas.
     * @example
     * // Create many ConfigSistemas
     * const configSistema = await prisma.configSistema.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConfigSistemas and only return the `clave`
     * const configSistemaWithClaveOnly = await prisma.configSistema.createManyAndReturn({
     *   select: { clave: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConfigSistemaCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfigSistemaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConfigSistema.
     * @param {ConfigSistemaDeleteArgs} args - Arguments to delete one ConfigSistema.
     * @example
     * // Delete one ConfigSistema
     * const ConfigSistema = await prisma.configSistema.delete({
     *   where: {
     *     // ... filter to delete one ConfigSistema
     *   }
     * })
     * 
     */
    delete<T extends ConfigSistemaDeleteArgs>(args: SelectSubset<T, ConfigSistemaDeleteArgs<ExtArgs>>): Prisma__ConfigSistemaClient<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConfigSistema.
     * @param {ConfigSistemaUpdateArgs} args - Arguments to update one ConfigSistema.
     * @example
     * // Update one ConfigSistema
     * const configSistema = await prisma.configSistema.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfigSistemaUpdateArgs>(args: SelectSubset<T, ConfigSistemaUpdateArgs<ExtArgs>>): Prisma__ConfigSistemaClient<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConfigSistemas.
     * @param {ConfigSistemaDeleteManyArgs} args - Arguments to filter ConfigSistemas to delete.
     * @example
     * // Delete a few ConfigSistemas
     * const { count } = await prisma.configSistema.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfigSistemaDeleteManyArgs>(args?: SelectSubset<T, ConfigSistemaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConfigSistemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigSistemaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConfigSistemas
     * const configSistema = await prisma.configSistema.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfigSistemaUpdateManyArgs>(args: SelectSubset<T, ConfigSistemaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConfigSistemas and returns the data updated in the database.
     * @param {ConfigSistemaUpdateManyAndReturnArgs} args - Arguments to update many ConfigSistemas.
     * @example
     * // Update many ConfigSistemas
     * const configSistema = await prisma.configSistema.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConfigSistemas and only return the `clave`
     * const configSistemaWithClaveOnly = await prisma.configSistema.updateManyAndReturn({
     *   select: { clave: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConfigSistemaUpdateManyAndReturnArgs>(args: SelectSubset<T, ConfigSistemaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConfigSistema.
     * @param {ConfigSistemaUpsertArgs} args - Arguments to update or create a ConfigSistema.
     * @example
     * // Update or create a ConfigSistema
     * const configSistema = await prisma.configSistema.upsert({
     *   create: {
     *     // ... data to create a ConfigSistema
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConfigSistema we want to update
     *   }
     * })
     */
    upsert<T extends ConfigSistemaUpsertArgs>(args: SelectSubset<T, ConfigSistemaUpsertArgs<ExtArgs>>): Prisma__ConfigSistemaClient<$Result.GetResult<Prisma.$ConfigSistemaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConfigSistemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigSistemaCountArgs} args - Arguments to filter ConfigSistemas to count.
     * @example
     * // Count the number of ConfigSistemas
     * const count = await prisma.configSistema.count({
     *   where: {
     *     // ... the filter for the ConfigSistemas we want to count
     *   }
     * })
    **/
    count<T extends ConfigSistemaCountArgs>(
      args?: Subset<T, ConfigSistemaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfigSistemaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConfigSistema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigSistemaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfigSistemaAggregateArgs>(args: Subset<T, ConfigSistemaAggregateArgs>): Prisma.PrismaPromise<GetConfigSistemaAggregateType<T>>

    /**
     * Group by ConfigSistema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigSistemaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConfigSistemaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfigSistemaGroupByArgs['orderBy'] }
        : { orderBy?: ConfigSistemaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConfigSistemaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfigSistemaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConfigSistema model
   */
  readonly fields: ConfigSistemaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConfigSistema.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfigSistemaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConfigSistema model
   */
  interface ConfigSistemaFieldRefs {
    readonly clave: FieldRef<"ConfigSistema", 'String'>
    readonly valor: FieldRef<"ConfigSistema", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ConfigSistema findUnique
   */
  export type ConfigSistemaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * Filter, which ConfigSistema to fetch.
     */
    where: ConfigSistemaWhereUniqueInput
  }

  /**
   * ConfigSistema findUniqueOrThrow
   */
  export type ConfigSistemaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * Filter, which ConfigSistema to fetch.
     */
    where: ConfigSistemaWhereUniqueInput
  }

  /**
   * ConfigSistema findFirst
   */
  export type ConfigSistemaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * Filter, which ConfigSistema to fetch.
     */
    where?: ConfigSistemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConfigSistemas to fetch.
     */
    orderBy?: ConfigSistemaOrderByWithRelationInput | ConfigSistemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConfigSistemas.
     */
    cursor?: ConfigSistemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfigSistemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfigSistemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConfigSistemas.
     */
    distinct?: ConfigSistemaScalarFieldEnum | ConfigSistemaScalarFieldEnum[]
  }

  /**
   * ConfigSistema findFirstOrThrow
   */
  export type ConfigSistemaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * Filter, which ConfigSistema to fetch.
     */
    where?: ConfigSistemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConfigSistemas to fetch.
     */
    orderBy?: ConfigSistemaOrderByWithRelationInput | ConfigSistemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConfigSistemas.
     */
    cursor?: ConfigSistemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfigSistemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfigSistemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConfigSistemas.
     */
    distinct?: ConfigSistemaScalarFieldEnum | ConfigSistemaScalarFieldEnum[]
  }

  /**
   * ConfigSistema findMany
   */
  export type ConfigSistemaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * Filter, which ConfigSistemas to fetch.
     */
    where?: ConfigSistemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConfigSistemas to fetch.
     */
    orderBy?: ConfigSistemaOrderByWithRelationInput | ConfigSistemaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConfigSistemas.
     */
    cursor?: ConfigSistemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfigSistemas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfigSistemas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConfigSistemas.
     */
    distinct?: ConfigSistemaScalarFieldEnum | ConfigSistemaScalarFieldEnum[]
  }

  /**
   * ConfigSistema create
   */
  export type ConfigSistemaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * The data needed to create a ConfigSistema.
     */
    data: XOR<ConfigSistemaCreateInput, ConfigSistemaUncheckedCreateInput>
  }

  /**
   * ConfigSistema createMany
   */
  export type ConfigSistemaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConfigSistemas.
     */
    data: ConfigSistemaCreateManyInput | ConfigSistemaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConfigSistema createManyAndReturn
   */
  export type ConfigSistemaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * The data used to create many ConfigSistemas.
     */
    data: ConfigSistemaCreateManyInput | ConfigSistemaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConfigSistema update
   */
  export type ConfigSistemaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * The data needed to update a ConfigSistema.
     */
    data: XOR<ConfigSistemaUpdateInput, ConfigSistemaUncheckedUpdateInput>
    /**
     * Choose, which ConfigSistema to update.
     */
    where: ConfigSistemaWhereUniqueInput
  }

  /**
   * ConfigSistema updateMany
   */
  export type ConfigSistemaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConfigSistemas.
     */
    data: XOR<ConfigSistemaUpdateManyMutationInput, ConfigSistemaUncheckedUpdateManyInput>
    /**
     * Filter which ConfigSistemas to update
     */
    where?: ConfigSistemaWhereInput
    /**
     * Limit how many ConfigSistemas to update.
     */
    limit?: number
  }

  /**
   * ConfigSistema updateManyAndReturn
   */
  export type ConfigSistemaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * The data used to update ConfigSistemas.
     */
    data: XOR<ConfigSistemaUpdateManyMutationInput, ConfigSistemaUncheckedUpdateManyInput>
    /**
     * Filter which ConfigSistemas to update
     */
    where?: ConfigSistemaWhereInput
    /**
     * Limit how many ConfigSistemas to update.
     */
    limit?: number
  }

  /**
   * ConfigSistema upsert
   */
  export type ConfigSistemaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * The filter to search for the ConfigSistema to update in case it exists.
     */
    where: ConfigSistemaWhereUniqueInput
    /**
     * In case the ConfigSistema found by the `where` argument doesn't exist, create a new ConfigSistema with this data.
     */
    create: XOR<ConfigSistemaCreateInput, ConfigSistemaUncheckedCreateInput>
    /**
     * In case the ConfigSistema was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfigSistemaUpdateInput, ConfigSistemaUncheckedUpdateInput>
  }

  /**
   * ConfigSistema delete
   */
  export type ConfigSistemaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
    /**
     * Filter which ConfigSistema to delete.
     */
    where: ConfigSistemaWhereUniqueInput
  }

  /**
   * ConfigSistema deleteMany
   */
  export type ConfigSistemaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConfigSistemas to delete
     */
    where?: ConfigSistemaWhereInput
    /**
     * Limit how many ConfigSistemas to delete.
     */
    limit?: number
  }

  /**
   * ConfigSistema without action
   */
  export type ConfigSistemaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfigSistema
     */
    select?: ConfigSistemaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConfigSistema
     */
    omit?: ConfigSistemaOmit<ExtArgs> | null
  }


  /**
   * Model Cliente
   */

  export type AggregateCliente = {
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  export type ClienteAvgAggregateOutputType = {
    id: number | null
  }

  export type ClienteSumAggregateOutputType = {
    id: number | null
  }

  export type ClienteMinAggregateOutputType = {
    id: number | null
    dni: string | null
    nombre: string | null
    email: string | null
    telefono: string | null
    activo: boolean | null
    creadoEn: Date | null
  }

  export type ClienteMaxAggregateOutputType = {
    id: number | null
    dni: string | null
    nombre: string | null
    email: string | null
    telefono: string | null
    activo: boolean | null
    creadoEn: Date | null
  }

  export type ClienteCountAggregateOutputType = {
    id: number
    dni: number
    nombre: number
    email: number
    telefono: number
    activo: number
    creadoEn: number
    _all: number
  }


  export type ClienteAvgAggregateInputType = {
    id?: true
  }

  export type ClienteSumAggregateInputType = {
    id?: true
  }

  export type ClienteMinAggregateInputType = {
    id?: true
    dni?: true
    nombre?: true
    email?: true
    telefono?: true
    activo?: true
    creadoEn?: true
  }

  export type ClienteMaxAggregateInputType = {
    id?: true
    dni?: true
    nombre?: true
    email?: true
    telefono?: true
    activo?: true
    creadoEn?: true
  }

  export type ClienteCountAggregateInputType = {
    id?: true
    dni?: true
    nombre?: true
    email?: true
    telefono?: true
    activo?: true
    creadoEn?: true
    _all?: true
  }

  export type ClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cliente to aggregate.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClienteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClienteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClienteMaxAggregateInputType
  }

  export type GetClienteAggregateType<T extends ClienteAggregateArgs> = {
        [P in keyof T & keyof AggregateCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCliente[P]>
      : GetScalarType<T[P], AggregateCliente[P]>
  }




  export type ClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithAggregationInput | ClienteOrderByWithAggregationInput[]
    by: ClienteScalarFieldEnum[] | ClienteScalarFieldEnum
    having?: ClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClienteCountAggregateInputType | true
    _avg?: ClienteAvgAggregateInputType
    _sum?: ClienteSumAggregateInputType
    _min?: ClienteMinAggregateInputType
    _max?: ClienteMaxAggregateInputType
  }

  export type ClienteGroupByOutputType = {
    id: number
    dni: string
    nombre: string
    email: string | null
    telefono: string | null
    activo: boolean
    creadoEn: Date
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  type GetClienteGroupByPayload<T extends ClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClienteGroupByOutputType[P]>
            : GetScalarType<T[P], ClienteGroupByOutputType[P]>
        }
      >
    >


  export type ClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dni?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    activo?: boolean
    creadoEn?: boolean
    ventas?: boolean | Cliente$ventasArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dni?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    activo?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dni?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    activo?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectScalar = {
    id?: boolean
    dni?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    activo?: boolean
    creadoEn?: boolean
  }

  export type ClienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dni" | "nombre" | "email" | "telefono" | "activo" | "creadoEn", ExtArgs["result"]["cliente"]>
  export type ClienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ventas?: boolean | Cliente$ventasArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClienteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClienteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cliente"
    objects: {
      ventas: Prisma.$VentaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dni: string
      nombre: string
      email: string | null
      telefono: string | null
      activo: boolean
      creadoEn: Date
    }, ExtArgs["result"]["cliente"]>
    composites: {}
  }

  type ClienteGetPayload<S extends boolean | null | undefined | ClienteDefaultArgs> = $Result.GetResult<Prisma.$ClientePayload, S>

  type ClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClienteCountAggregateInputType | true
    }

  export interface ClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cliente'], meta: { name: 'Cliente' } }
    /**
     * Find zero or one Cliente that matches the filter.
     * @param {ClienteFindUniqueArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClienteFindUniqueArgs>(args: SelectSubset<T, ClienteFindUniqueArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cliente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClienteFindUniqueOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, ClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClienteFindFirstArgs>(args?: SelectSubset<T, ClienteFindFirstArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, ClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.cliente.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.cliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clienteWithIdOnly = await prisma.cliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClienteFindManyArgs>(args?: SelectSubset<T, ClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cliente.
     * @param {ClienteCreateArgs} args - Arguments to create a Cliente.
     * @example
     * // Create one Cliente
     * const Cliente = await prisma.cliente.create({
     *   data: {
     *     // ... data to create a Cliente
     *   }
     * })
     * 
     */
    create<T extends ClienteCreateArgs>(args: SelectSubset<T, ClienteCreateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientes.
     * @param {ClienteCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClienteCreateManyArgs>(args?: SelectSubset<T, ClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clientes and returns the data saved in the database.
     * @param {ClienteCreateManyAndReturnArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClienteCreateManyAndReturnArgs>(args?: SelectSubset<T, ClienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cliente.
     * @param {ClienteDeleteArgs} args - Arguments to delete one Cliente.
     * @example
     * // Delete one Cliente
     * const Cliente = await prisma.cliente.delete({
     *   where: {
     *     // ... filter to delete one Cliente
     *   }
     * })
     * 
     */
    delete<T extends ClienteDeleteArgs>(args: SelectSubset<T, ClienteDeleteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cliente.
     * @param {ClienteUpdateArgs} args - Arguments to update one Cliente.
     * @example
     * // Update one Cliente
     * const cliente = await prisma.cliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClienteUpdateArgs>(args: SelectSubset<T, ClienteUpdateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientes.
     * @param {ClienteDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.cliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClienteDeleteManyArgs>(args?: SelectSubset<T, ClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClienteUpdateManyArgs>(args: SelectSubset<T, ClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes and returns the data updated in the database.
     * @param {ClienteUpdateManyAndReturnArgs} args - Arguments to update many Clientes.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClienteUpdateManyAndReturnArgs>(args: SelectSubset<T, ClienteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cliente.
     * @param {ClienteUpsertArgs} args - Arguments to update or create a Cliente.
     * @example
     * // Update or create a Cliente
     * const cliente = await prisma.cliente.upsert({
     *   create: {
     *     // ... data to create a Cliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cliente we want to update
     *   }
     * })
     */
    upsert<T extends ClienteUpsertArgs>(args: SelectSubset<T, ClienteUpsertArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.cliente.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClienteCountArgs>(
      args?: Subset<T, ClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClienteAggregateArgs>(args: Subset<T, ClienteAggregateArgs>): Prisma.PrismaPromise<GetClienteAggregateType<T>>

    /**
     * Group by Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClienteGroupByArgs['orderBy'] }
        : { orderBy?: ClienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cliente model
   */
  readonly fields: ClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ventas<T extends Cliente$ventasArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$ventasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cliente model
   */
  interface ClienteFieldRefs {
    readonly id: FieldRef<"Cliente", 'Int'>
    readonly dni: FieldRef<"Cliente", 'String'>
    readonly nombre: FieldRef<"Cliente", 'String'>
    readonly email: FieldRef<"Cliente", 'String'>
    readonly telefono: FieldRef<"Cliente", 'String'>
    readonly activo: FieldRef<"Cliente", 'Boolean'>
    readonly creadoEn: FieldRef<"Cliente", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cliente findUnique
   */
  export type ClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findUniqueOrThrow
   */
  export type ClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findFirst
   */
  export type ClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findFirstOrThrow
   */
  export type ClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findMany
   */
  export type ClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente create
   */
  export type ClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Cliente.
     */
    data: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
  }

  /**
   * Cliente createMany
   */
  export type ClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cliente createManyAndReturn
   */
  export type ClienteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cliente update
   */
  export type ClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Cliente.
     */
    data: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
    /**
     * Choose, which Cliente to update.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente updateMany
   */
  export type ClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente updateManyAndReturn
   */
  export type ClienteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente upsert
   */
  export type ClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Cliente to update in case it exists.
     */
    where: ClienteWhereUniqueInput
    /**
     * In case the Cliente found by the `where` argument doesn't exist, create a new Cliente with this data.
     */
    create: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
    /**
     * In case the Cliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
  }

  /**
   * Cliente delete
   */
  export type ClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter which Cliente to delete.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente deleteMany
   */
  export type ClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to delete.
     */
    limit?: number
  }

  /**
   * Cliente.ventas
   */
  export type Cliente$ventasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    where?: VentaWhereInput
    orderBy?: VentaOrderByWithRelationInput | VentaOrderByWithRelationInput[]
    cursor?: VentaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VentaScalarFieldEnum | VentaScalarFieldEnum[]
  }

  /**
   * Cliente without action
   */
  export type ClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
  }


  /**
   * Model Venta
   */

  export type AggregateVenta = {
    _count: VentaCountAggregateOutputType | null
    _avg: VentaAvgAggregateOutputType | null
    _sum: VentaSumAggregateOutputType | null
    _min: VentaMinAggregateOutputType | null
    _max: VentaMaxAggregateOutputType | null
  }

  export type VentaAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    clienteId: number | null
    subtotal: Decimal | null
    igv: Decimal | null
    total: Decimal | null
    montoRecibido: Decimal | null
    vuelto: Decimal | null
  }

  export type VentaSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    clienteId: number | null
    subtotal: Decimal | null
    igv: Decimal | null
    total: Decimal | null
    montoRecibido: Decimal | null
    vuelto: Decimal | null
  }

  export type VentaMinAggregateOutputType = {
    id: number | null
    numero: string | null
    usuarioId: number | null
    clienteId: number | null
    subtotal: Decimal | null
    igv: Decimal | null
    total: Decimal | null
    metodoPago: string | null
    montoRecibido: Decimal | null
    vuelto: Decimal | null
    estado: string | null
    creadoEn: Date | null
  }

  export type VentaMaxAggregateOutputType = {
    id: number | null
    numero: string | null
    usuarioId: number | null
    clienteId: number | null
    subtotal: Decimal | null
    igv: Decimal | null
    total: Decimal | null
    metodoPago: string | null
    montoRecibido: Decimal | null
    vuelto: Decimal | null
    estado: string | null
    creadoEn: Date | null
  }

  export type VentaCountAggregateOutputType = {
    id: number
    numero: number
    usuarioId: number
    clienteId: number
    subtotal: number
    igv: number
    total: number
    metodoPago: number
    montoRecibido: number
    vuelto: number
    estado: number
    creadoEn: number
    _all: number
  }


  export type VentaAvgAggregateInputType = {
    id?: true
    usuarioId?: true
    clienteId?: true
    subtotal?: true
    igv?: true
    total?: true
    montoRecibido?: true
    vuelto?: true
  }

  export type VentaSumAggregateInputType = {
    id?: true
    usuarioId?: true
    clienteId?: true
    subtotal?: true
    igv?: true
    total?: true
    montoRecibido?: true
    vuelto?: true
  }

  export type VentaMinAggregateInputType = {
    id?: true
    numero?: true
    usuarioId?: true
    clienteId?: true
    subtotal?: true
    igv?: true
    total?: true
    metodoPago?: true
    montoRecibido?: true
    vuelto?: true
    estado?: true
    creadoEn?: true
  }

  export type VentaMaxAggregateInputType = {
    id?: true
    numero?: true
    usuarioId?: true
    clienteId?: true
    subtotal?: true
    igv?: true
    total?: true
    metodoPago?: true
    montoRecibido?: true
    vuelto?: true
    estado?: true
    creadoEn?: true
  }

  export type VentaCountAggregateInputType = {
    id?: true
    numero?: true
    usuarioId?: true
    clienteId?: true
    subtotal?: true
    igv?: true
    total?: true
    metodoPago?: true
    montoRecibido?: true
    vuelto?: true
    estado?: true
    creadoEn?: true
    _all?: true
  }

  export type VentaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venta to aggregate.
     */
    where?: VentaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ventas to fetch.
     */
    orderBy?: VentaOrderByWithRelationInput | VentaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VentaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ventas
    **/
    _count?: true | VentaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VentaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VentaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VentaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VentaMaxAggregateInputType
  }

  export type GetVentaAggregateType<T extends VentaAggregateArgs> = {
        [P in keyof T & keyof AggregateVenta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenta[P]>
      : GetScalarType<T[P], AggregateVenta[P]>
  }




  export type VentaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VentaWhereInput
    orderBy?: VentaOrderByWithAggregationInput | VentaOrderByWithAggregationInput[]
    by: VentaScalarFieldEnum[] | VentaScalarFieldEnum
    having?: VentaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VentaCountAggregateInputType | true
    _avg?: VentaAvgAggregateInputType
    _sum?: VentaSumAggregateInputType
    _min?: VentaMinAggregateInputType
    _max?: VentaMaxAggregateInputType
  }

  export type VentaGroupByOutputType = {
    id: number
    numero: string
    usuarioId: number
    clienteId: number | null
    subtotal: Decimal
    igv: Decimal
    total: Decimal
    metodoPago: string
    montoRecibido: Decimal
    vuelto: Decimal
    estado: string
    creadoEn: Date
    _count: VentaCountAggregateOutputType | null
    _avg: VentaAvgAggregateOutputType | null
    _sum: VentaSumAggregateOutputType | null
    _min: VentaMinAggregateOutputType | null
    _max: VentaMaxAggregateOutputType | null
  }

  type GetVentaGroupByPayload<T extends VentaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VentaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VentaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VentaGroupByOutputType[P]>
            : GetScalarType<T[P], VentaGroupByOutputType[P]>
        }
      >
    >


  export type VentaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    usuarioId?: boolean
    clienteId?: boolean
    subtotal?: boolean
    igv?: boolean
    total?: boolean
    metodoPago?: boolean
    montoRecibido?: boolean
    vuelto?: boolean
    estado?: boolean
    creadoEn?: boolean
    detalles?: boolean | Venta$detallesArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    cliente?: boolean | Venta$clienteArgs<ExtArgs>
    _count?: boolean | VentaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venta"]>

  export type VentaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    usuarioId?: boolean
    clienteId?: boolean
    subtotal?: boolean
    igv?: boolean
    total?: boolean
    metodoPago?: boolean
    montoRecibido?: boolean
    vuelto?: boolean
    estado?: boolean
    creadoEn?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    cliente?: boolean | Venta$clienteArgs<ExtArgs>
  }, ExtArgs["result"]["venta"]>

  export type VentaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    usuarioId?: boolean
    clienteId?: boolean
    subtotal?: boolean
    igv?: boolean
    total?: boolean
    metodoPago?: boolean
    montoRecibido?: boolean
    vuelto?: boolean
    estado?: boolean
    creadoEn?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    cliente?: boolean | Venta$clienteArgs<ExtArgs>
  }, ExtArgs["result"]["venta"]>

  export type VentaSelectScalar = {
    id?: boolean
    numero?: boolean
    usuarioId?: boolean
    clienteId?: boolean
    subtotal?: boolean
    igv?: boolean
    total?: boolean
    metodoPago?: boolean
    montoRecibido?: boolean
    vuelto?: boolean
    estado?: boolean
    creadoEn?: boolean
  }

  export type VentaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "usuarioId" | "clienteId" | "subtotal" | "igv" | "total" | "metodoPago" | "montoRecibido" | "vuelto" | "estado" | "creadoEn", ExtArgs["result"]["venta"]>
  export type VentaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detalles?: boolean | Venta$detallesArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    cliente?: boolean | Venta$clienteArgs<ExtArgs>
    _count?: boolean | VentaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VentaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    cliente?: boolean | Venta$clienteArgs<ExtArgs>
  }
  export type VentaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    cliente?: boolean | Venta$clienteArgs<ExtArgs>
  }

  export type $VentaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Venta"
    objects: {
      detalles: Prisma.$DetalleVentaPayload<ExtArgs>[]
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      cliente: Prisma.$ClientePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      numero: string
      usuarioId: number
      clienteId: number | null
      subtotal: Prisma.Decimal
      igv: Prisma.Decimal
      total: Prisma.Decimal
      metodoPago: string
      montoRecibido: Prisma.Decimal
      vuelto: Prisma.Decimal
      estado: string
      creadoEn: Date
    }, ExtArgs["result"]["venta"]>
    composites: {}
  }

  type VentaGetPayload<S extends boolean | null | undefined | VentaDefaultArgs> = $Result.GetResult<Prisma.$VentaPayload, S>

  type VentaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VentaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VentaCountAggregateInputType | true
    }

  export interface VentaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Venta'], meta: { name: 'Venta' } }
    /**
     * Find zero or one Venta that matches the filter.
     * @param {VentaFindUniqueArgs} args - Arguments to find a Venta
     * @example
     * // Get one Venta
     * const venta = await prisma.venta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VentaFindUniqueArgs>(args: SelectSubset<T, VentaFindUniqueArgs<ExtArgs>>): Prisma__VentaClient<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Venta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VentaFindUniqueOrThrowArgs} args - Arguments to find a Venta
     * @example
     * // Get one Venta
     * const venta = await prisma.venta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VentaFindUniqueOrThrowArgs>(args: SelectSubset<T, VentaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VentaClient<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaFindFirstArgs} args - Arguments to find a Venta
     * @example
     * // Get one Venta
     * const venta = await prisma.venta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VentaFindFirstArgs>(args?: SelectSubset<T, VentaFindFirstArgs<ExtArgs>>): Prisma__VentaClient<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaFindFirstOrThrowArgs} args - Arguments to find a Venta
     * @example
     * // Get one Venta
     * const venta = await prisma.venta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VentaFindFirstOrThrowArgs>(args?: SelectSubset<T, VentaFindFirstOrThrowArgs<ExtArgs>>): Prisma__VentaClient<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ventas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ventas
     * const ventas = await prisma.venta.findMany()
     * 
     * // Get first 10 Ventas
     * const ventas = await prisma.venta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ventaWithIdOnly = await prisma.venta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VentaFindManyArgs>(args?: SelectSubset<T, VentaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Venta.
     * @param {VentaCreateArgs} args - Arguments to create a Venta.
     * @example
     * // Create one Venta
     * const Venta = await prisma.venta.create({
     *   data: {
     *     // ... data to create a Venta
     *   }
     * })
     * 
     */
    create<T extends VentaCreateArgs>(args: SelectSubset<T, VentaCreateArgs<ExtArgs>>): Prisma__VentaClient<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ventas.
     * @param {VentaCreateManyArgs} args - Arguments to create many Ventas.
     * @example
     * // Create many Ventas
     * const venta = await prisma.venta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VentaCreateManyArgs>(args?: SelectSubset<T, VentaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ventas and returns the data saved in the database.
     * @param {VentaCreateManyAndReturnArgs} args - Arguments to create many Ventas.
     * @example
     * // Create many Ventas
     * const venta = await prisma.venta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ventas and only return the `id`
     * const ventaWithIdOnly = await prisma.venta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VentaCreateManyAndReturnArgs>(args?: SelectSubset<T, VentaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Venta.
     * @param {VentaDeleteArgs} args - Arguments to delete one Venta.
     * @example
     * // Delete one Venta
     * const Venta = await prisma.venta.delete({
     *   where: {
     *     // ... filter to delete one Venta
     *   }
     * })
     * 
     */
    delete<T extends VentaDeleteArgs>(args: SelectSubset<T, VentaDeleteArgs<ExtArgs>>): Prisma__VentaClient<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Venta.
     * @param {VentaUpdateArgs} args - Arguments to update one Venta.
     * @example
     * // Update one Venta
     * const venta = await prisma.venta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VentaUpdateArgs>(args: SelectSubset<T, VentaUpdateArgs<ExtArgs>>): Prisma__VentaClient<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ventas.
     * @param {VentaDeleteManyArgs} args - Arguments to filter Ventas to delete.
     * @example
     * // Delete a few Ventas
     * const { count } = await prisma.venta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VentaDeleteManyArgs>(args?: SelectSubset<T, VentaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ventas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ventas
     * const venta = await prisma.venta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VentaUpdateManyArgs>(args: SelectSubset<T, VentaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ventas and returns the data updated in the database.
     * @param {VentaUpdateManyAndReturnArgs} args - Arguments to update many Ventas.
     * @example
     * // Update many Ventas
     * const venta = await prisma.venta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ventas and only return the `id`
     * const ventaWithIdOnly = await prisma.venta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VentaUpdateManyAndReturnArgs>(args: SelectSubset<T, VentaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Venta.
     * @param {VentaUpsertArgs} args - Arguments to update or create a Venta.
     * @example
     * // Update or create a Venta
     * const venta = await prisma.venta.upsert({
     *   create: {
     *     // ... data to create a Venta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Venta we want to update
     *   }
     * })
     */
    upsert<T extends VentaUpsertArgs>(args: SelectSubset<T, VentaUpsertArgs<ExtArgs>>): Prisma__VentaClient<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ventas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaCountArgs} args - Arguments to filter Ventas to count.
     * @example
     * // Count the number of Ventas
     * const count = await prisma.venta.count({
     *   where: {
     *     // ... the filter for the Ventas we want to count
     *   }
     * })
    **/
    count<T extends VentaCountArgs>(
      args?: Subset<T, VentaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VentaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Venta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VentaAggregateArgs>(args: Subset<T, VentaAggregateArgs>): Prisma.PrismaPromise<GetVentaAggregateType<T>>

    /**
     * Group by Venta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VentaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VentaGroupByArgs['orderBy'] }
        : { orderBy?: VentaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VentaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVentaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Venta model
   */
  readonly fields: VentaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Venta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VentaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    detalles<T extends Venta$detallesArgs<ExtArgs> = {}>(args?: Subset<T, Venta$detallesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cliente<T extends Venta$clienteArgs<ExtArgs> = {}>(args?: Subset<T, Venta$clienteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Venta model
   */
  interface VentaFieldRefs {
    readonly id: FieldRef<"Venta", 'Int'>
    readonly numero: FieldRef<"Venta", 'String'>
    readonly usuarioId: FieldRef<"Venta", 'Int'>
    readonly clienteId: FieldRef<"Venta", 'Int'>
    readonly subtotal: FieldRef<"Venta", 'Decimal'>
    readonly igv: FieldRef<"Venta", 'Decimal'>
    readonly total: FieldRef<"Venta", 'Decimal'>
    readonly metodoPago: FieldRef<"Venta", 'String'>
    readonly montoRecibido: FieldRef<"Venta", 'Decimal'>
    readonly vuelto: FieldRef<"Venta", 'Decimal'>
    readonly estado: FieldRef<"Venta", 'String'>
    readonly creadoEn: FieldRef<"Venta", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Venta findUnique
   */
  export type VentaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    /**
     * Filter, which Venta to fetch.
     */
    where: VentaWhereUniqueInput
  }

  /**
   * Venta findUniqueOrThrow
   */
  export type VentaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    /**
     * Filter, which Venta to fetch.
     */
    where: VentaWhereUniqueInput
  }

  /**
   * Venta findFirst
   */
  export type VentaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    /**
     * Filter, which Venta to fetch.
     */
    where?: VentaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ventas to fetch.
     */
    orderBy?: VentaOrderByWithRelationInput | VentaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ventas.
     */
    cursor?: VentaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ventas.
     */
    distinct?: VentaScalarFieldEnum | VentaScalarFieldEnum[]
  }

  /**
   * Venta findFirstOrThrow
   */
  export type VentaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    /**
     * Filter, which Venta to fetch.
     */
    where?: VentaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ventas to fetch.
     */
    orderBy?: VentaOrderByWithRelationInput | VentaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ventas.
     */
    cursor?: VentaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ventas.
     */
    distinct?: VentaScalarFieldEnum | VentaScalarFieldEnum[]
  }

  /**
   * Venta findMany
   */
  export type VentaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    /**
     * Filter, which Ventas to fetch.
     */
    where?: VentaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ventas to fetch.
     */
    orderBy?: VentaOrderByWithRelationInput | VentaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ventas.
     */
    cursor?: VentaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ventas.
     */
    distinct?: VentaScalarFieldEnum | VentaScalarFieldEnum[]
  }

  /**
   * Venta create
   */
  export type VentaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    /**
     * The data needed to create a Venta.
     */
    data: XOR<VentaCreateInput, VentaUncheckedCreateInput>
  }

  /**
   * Venta createMany
   */
  export type VentaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ventas.
     */
    data: VentaCreateManyInput | VentaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venta createManyAndReturn
   */
  export type VentaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * The data used to create many Ventas.
     */
    data: VentaCreateManyInput | VentaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Venta update
   */
  export type VentaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    /**
     * The data needed to update a Venta.
     */
    data: XOR<VentaUpdateInput, VentaUncheckedUpdateInput>
    /**
     * Choose, which Venta to update.
     */
    where: VentaWhereUniqueInput
  }

  /**
   * Venta updateMany
   */
  export type VentaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ventas.
     */
    data: XOR<VentaUpdateManyMutationInput, VentaUncheckedUpdateManyInput>
    /**
     * Filter which Ventas to update
     */
    where?: VentaWhereInput
    /**
     * Limit how many Ventas to update.
     */
    limit?: number
  }

  /**
   * Venta updateManyAndReturn
   */
  export type VentaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * The data used to update Ventas.
     */
    data: XOR<VentaUpdateManyMutationInput, VentaUncheckedUpdateManyInput>
    /**
     * Filter which Ventas to update
     */
    where?: VentaWhereInput
    /**
     * Limit how many Ventas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Venta upsert
   */
  export type VentaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    /**
     * The filter to search for the Venta to update in case it exists.
     */
    where: VentaWhereUniqueInput
    /**
     * In case the Venta found by the `where` argument doesn't exist, create a new Venta with this data.
     */
    create: XOR<VentaCreateInput, VentaUncheckedCreateInput>
    /**
     * In case the Venta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VentaUpdateInput, VentaUncheckedUpdateInput>
  }

  /**
   * Venta delete
   */
  export type VentaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
    /**
     * Filter which Venta to delete.
     */
    where: VentaWhereUniqueInput
  }

  /**
   * Venta deleteMany
   */
  export type VentaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ventas to delete
     */
    where?: VentaWhereInput
    /**
     * Limit how many Ventas to delete.
     */
    limit?: number
  }

  /**
   * Venta.detalles
   */
  export type Venta$detallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    where?: DetalleVentaWhereInput
    orderBy?: DetalleVentaOrderByWithRelationInput | DetalleVentaOrderByWithRelationInput[]
    cursor?: DetalleVentaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DetalleVentaScalarFieldEnum | DetalleVentaScalarFieldEnum[]
  }

  /**
   * Venta.cliente
   */
  export type Venta$clienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    where?: ClienteWhereInput
  }

  /**
   * Venta without action
   */
  export type VentaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venta
     */
    select?: VentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venta
     */
    omit?: VentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VentaInclude<ExtArgs> | null
  }


  /**
   * Model DetalleVenta
   */

  export type AggregateDetalleVenta = {
    _count: DetalleVentaCountAggregateOutputType | null
    _avg: DetalleVentaAvgAggregateOutputType | null
    _sum: DetalleVentaSumAggregateOutputType | null
    _min: DetalleVentaMinAggregateOutputType | null
    _max: DetalleVentaMaxAggregateOutputType | null
  }

  export type DetalleVentaAvgAggregateOutputType = {
    id: number | null
    ventaId: number | null
    productoId: number | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type DetalleVentaSumAggregateOutputType = {
    id: number | null
    ventaId: number | null
    productoId: number | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type DetalleVentaMinAggregateOutputType = {
    id: number | null
    ventaId: number | null
    productoId: number | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type DetalleVentaMaxAggregateOutputType = {
    id: number | null
    ventaId: number | null
    productoId: number | null
    cantidad: number | null
    precioUnitario: Decimal | null
    subtotal: Decimal | null
  }

  export type DetalleVentaCountAggregateOutputType = {
    id: number
    ventaId: number
    productoId: number
    cantidad: number
    precioUnitario: number
    subtotal: number
    _all: number
  }


  export type DetalleVentaAvgAggregateInputType = {
    id?: true
    ventaId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type DetalleVentaSumAggregateInputType = {
    id?: true
    ventaId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type DetalleVentaMinAggregateInputType = {
    id?: true
    ventaId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type DetalleVentaMaxAggregateInputType = {
    id?: true
    ventaId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
  }

  export type DetalleVentaCountAggregateInputType = {
    id?: true
    ventaId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    subtotal?: true
    _all?: true
  }

  export type DetalleVentaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DetalleVenta to aggregate.
     */
    where?: DetalleVentaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleVentas to fetch.
     */
    orderBy?: DetalleVentaOrderByWithRelationInput | DetalleVentaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DetalleVentaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleVentas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleVentas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DetalleVentas
    **/
    _count?: true | DetalleVentaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DetalleVentaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DetalleVentaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DetalleVentaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DetalleVentaMaxAggregateInputType
  }

  export type GetDetalleVentaAggregateType<T extends DetalleVentaAggregateArgs> = {
        [P in keyof T & keyof AggregateDetalleVenta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDetalleVenta[P]>
      : GetScalarType<T[P], AggregateDetalleVenta[P]>
  }




  export type DetalleVentaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DetalleVentaWhereInput
    orderBy?: DetalleVentaOrderByWithAggregationInput | DetalleVentaOrderByWithAggregationInput[]
    by: DetalleVentaScalarFieldEnum[] | DetalleVentaScalarFieldEnum
    having?: DetalleVentaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DetalleVentaCountAggregateInputType | true
    _avg?: DetalleVentaAvgAggregateInputType
    _sum?: DetalleVentaSumAggregateInputType
    _min?: DetalleVentaMinAggregateInputType
    _max?: DetalleVentaMaxAggregateInputType
  }

  export type DetalleVentaGroupByOutputType = {
    id: number
    ventaId: number
    productoId: number
    cantidad: number
    precioUnitario: Decimal
    subtotal: Decimal
    _count: DetalleVentaCountAggregateOutputType | null
    _avg: DetalleVentaAvgAggregateOutputType | null
    _sum: DetalleVentaSumAggregateOutputType | null
    _min: DetalleVentaMinAggregateOutputType | null
    _max: DetalleVentaMaxAggregateOutputType | null
  }

  type GetDetalleVentaGroupByPayload<T extends DetalleVentaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DetalleVentaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DetalleVentaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DetalleVentaGroupByOutputType[P]>
            : GetScalarType<T[P], DetalleVentaGroupByOutputType[P]>
        }
      >
    >


  export type DetalleVentaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ventaId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    venta?: boolean | VentaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["detalleVenta"]>

  export type DetalleVentaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ventaId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    venta?: boolean | VentaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["detalleVenta"]>

  export type DetalleVentaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ventaId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
    venta?: boolean | VentaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["detalleVenta"]>

  export type DetalleVentaSelectScalar = {
    id?: boolean
    ventaId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    subtotal?: boolean
  }

  export type DetalleVentaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ventaId" | "productoId" | "cantidad" | "precioUnitario" | "subtotal", ExtArgs["result"]["detalleVenta"]>
  export type DetalleVentaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venta?: boolean | VentaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type DetalleVentaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venta?: boolean | VentaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type DetalleVentaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venta?: boolean | VentaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }

  export type $DetalleVentaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DetalleVenta"
    objects: {
      venta: Prisma.$VentaPayload<ExtArgs>
      producto: Prisma.$ProductoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      ventaId: number
      productoId: number
      cantidad: number
      precioUnitario: Prisma.Decimal
      subtotal: Prisma.Decimal
    }, ExtArgs["result"]["detalleVenta"]>
    composites: {}
  }

  type DetalleVentaGetPayload<S extends boolean | null | undefined | DetalleVentaDefaultArgs> = $Result.GetResult<Prisma.$DetalleVentaPayload, S>

  type DetalleVentaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DetalleVentaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DetalleVentaCountAggregateInputType | true
    }

  export interface DetalleVentaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DetalleVenta'], meta: { name: 'DetalleVenta' } }
    /**
     * Find zero or one DetalleVenta that matches the filter.
     * @param {DetalleVentaFindUniqueArgs} args - Arguments to find a DetalleVenta
     * @example
     * // Get one DetalleVenta
     * const detalleVenta = await prisma.detalleVenta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DetalleVentaFindUniqueArgs>(args: SelectSubset<T, DetalleVentaFindUniqueArgs<ExtArgs>>): Prisma__DetalleVentaClient<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DetalleVenta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DetalleVentaFindUniqueOrThrowArgs} args - Arguments to find a DetalleVenta
     * @example
     * // Get one DetalleVenta
     * const detalleVenta = await prisma.detalleVenta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DetalleVentaFindUniqueOrThrowArgs>(args: SelectSubset<T, DetalleVentaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DetalleVentaClient<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DetalleVenta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleVentaFindFirstArgs} args - Arguments to find a DetalleVenta
     * @example
     * // Get one DetalleVenta
     * const detalleVenta = await prisma.detalleVenta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DetalleVentaFindFirstArgs>(args?: SelectSubset<T, DetalleVentaFindFirstArgs<ExtArgs>>): Prisma__DetalleVentaClient<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DetalleVenta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleVentaFindFirstOrThrowArgs} args - Arguments to find a DetalleVenta
     * @example
     * // Get one DetalleVenta
     * const detalleVenta = await prisma.detalleVenta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DetalleVentaFindFirstOrThrowArgs>(args?: SelectSubset<T, DetalleVentaFindFirstOrThrowArgs<ExtArgs>>): Prisma__DetalleVentaClient<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DetalleVentas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleVentaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DetalleVentas
     * const detalleVentas = await prisma.detalleVenta.findMany()
     * 
     * // Get first 10 DetalleVentas
     * const detalleVentas = await prisma.detalleVenta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const detalleVentaWithIdOnly = await prisma.detalleVenta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DetalleVentaFindManyArgs>(args?: SelectSubset<T, DetalleVentaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DetalleVenta.
     * @param {DetalleVentaCreateArgs} args - Arguments to create a DetalleVenta.
     * @example
     * // Create one DetalleVenta
     * const DetalleVenta = await prisma.detalleVenta.create({
     *   data: {
     *     // ... data to create a DetalleVenta
     *   }
     * })
     * 
     */
    create<T extends DetalleVentaCreateArgs>(args: SelectSubset<T, DetalleVentaCreateArgs<ExtArgs>>): Prisma__DetalleVentaClient<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DetalleVentas.
     * @param {DetalleVentaCreateManyArgs} args - Arguments to create many DetalleVentas.
     * @example
     * // Create many DetalleVentas
     * const detalleVenta = await prisma.detalleVenta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DetalleVentaCreateManyArgs>(args?: SelectSubset<T, DetalleVentaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DetalleVentas and returns the data saved in the database.
     * @param {DetalleVentaCreateManyAndReturnArgs} args - Arguments to create many DetalleVentas.
     * @example
     * // Create many DetalleVentas
     * const detalleVenta = await prisma.detalleVenta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DetalleVentas and only return the `id`
     * const detalleVentaWithIdOnly = await prisma.detalleVenta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DetalleVentaCreateManyAndReturnArgs>(args?: SelectSubset<T, DetalleVentaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DetalleVenta.
     * @param {DetalleVentaDeleteArgs} args - Arguments to delete one DetalleVenta.
     * @example
     * // Delete one DetalleVenta
     * const DetalleVenta = await prisma.detalleVenta.delete({
     *   where: {
     *     // ... filter to delete one DetalleVenta
     *   }
     * })
     * 
     */
    delete<T extends DetalleVentaDeleteArgs>(args: SelectSubset<T, DetalleVentaDeleteArgs<ExtArgs>>): Prisma__DetalleVentaClient<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DetalleVenta.
     * @param {DetalleVentaUpdateArgs} args - Arguments to update one DetalleVenta.
     * @example
     * // Update one DetalleVenta
     * const detalleVenta = await prisma.detalleVenta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DetalleVentaUpdateArgs>(args: SelectSubset<T, DetalleVentaUpdateArgs<ExtArgs>>): Prisma__DetalleVentaClient<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DetalleVentas.
     * @param {DetalleVentaDeleteManyArgs} args - Arguments to filter DetalleVentas to delete.
     * @example
     * // Delete a few DetalleVentas
     * const { count } = await prisma.detalleVenta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DetalleVentaDeleteManyArgs>(args?: SelectSubset<T, DetalleVentaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DetalleVentas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleVentaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DetalleVentas
     * const detalleVenta = await prisma.detalleVenta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DetalleVentaUpdateManyArgs>(args: SelectSubset<T, DetalleVentaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DetalleVentas and returns the data updated in the database.
     * @param {DetalleVentaUpdateManyAndReturnArgs} args - Arguments to update many DetalleVentas.
     * @example
     * // Update many DetalleVentas
     * const detalleVenta = await prisma.detalleVenta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DetalleVentas and only return the `id`
     * const detalleVentaWithIdOnly = await prisma.detalleVenta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DetalleVentaUpdateManyAndReturnArgs>(args: SelectSubset<T, DetalleVentaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DetalleVenta.
     * @param {DetalleVentaUpsertArgs} args - Arguments to update or create a DetalleVenta.
     * @example
     * // Update or create a DetalleVenta
     * const detalleVenta = await prisma.detalleVenta.upsert({
     *   create: {
     *     // ... data to create a DetalleVenta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DetalleVenta we want to update
     *   }
     * })
     */
    upsert<T extends DetalleVentaUpsertArgs>(args: SelectSubset<T, DetalleVentaUpsertArgs<ExtArgs>>): Prisma__DetalleVentaClient<$Result.GetResult<Prisma.$DetalleVentaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DetalleVentas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleVentaCountArgs} args - Arguments to filter DetalleVentas to count.
     * @example
     * // Count the number of DetalleVentas
     * const count = await prisma.detalleVenta.count({
     *   where: {
     *     // ... the filter for the DetalleVentas we want to count
     *   }
     * })
    **/
    count<T extends DetalleVentaCountArgs>(
      args?: Subset<T, DetalleVentaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DetalleVentaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DetalleVenta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleVentaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DetalleVentaAggregateArgs>(args: Subset<T, DetalleVentaAggregateArgs>): Prisma.PrismaPromise<GetDetalleVentaAggregateType<T>>

    /**
     * Group by DetalleVenta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleVentaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DetalleVentaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DetalleVentaGroupByArgs['orderBy'] }
        : { orderBy?: DetalleVentaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DetalleVentaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDetalleVentaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DetalleVenta model
   */
  readonly fields: DetalleVentaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DetalleVenta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DetalleVentaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    venta<T extends VentaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VentaDefaultArgs<ExtArgs>>): Prisma__VentaClient<$Result.GetResult<Prisma.$VentaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DetalleVenta model
   */
  interface DetalleVentaFieldRefs {
    readonly id: FieldRef<"DetalleVenta", 'Int'>
    readonly ventaId: FieldRef<"DetalleVenta", 'Int'>
    readonly productoId: FieldRef<"DetalleVenta", 'Int'>
    readonly cantidad: FieldRef<"DetalleVenta", 'Int'>
    readonly precioUnitario: FieldRef<"DetalleVenta", 'Decimal'>
    readonly subtotal: FieldRef<"DetalleVenta", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * DetalleVenta findUnique
   */
  export type DetalleVentaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleVenta to fetch.
     */
    where: DetalleVentaWhereUniqueInput
  }

  /**
   * DetalleVenta findUniqueOrThrow
   */
  export type DetalleVentaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleVenta to fetch.
     */
    where: DetalleVentaWhereUniqueInput
  }

  /**
   * DetalleVenta findFirst
   */
  export type DetalleVentaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleVenta to fetch.
     */
    where?: DetalleVentaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleVentas to fetch.
     */
    orderBy?: DetalleVentaOrderByWithRelationInput | DetalleVentaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DetalleVentas.
     */
    cursor?: DetalleVentaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleVentas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleVentas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DetalleVentas.
     */
    distinct?: DetalleVentaScalarFieldEnum | DetalleVentaScalarFieldEnum[]
  }

  /**
   * DetalleVenta findFirstOrThrow
   */
  export type DetalleVentaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleVenta to fetch.
     */
    where?: DetalleVentaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleVentas to fetch.
     */
    orderBy?: DetalleVentaOrderByWithRelationInput | DetalleVentaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DetalleVentas.
     */
    cursor?: DetalleVentaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleVentas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleVentas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DetalleVentas.
     */
    distinct?: DetalleVentaScalarFieldEnum | DetalleVentaScalarFieldEnum[]
  }

  /**
   * DetalleVenta findMany
   */
  export type DetalleVentaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleVentas to fetch.
     */
    where?: DetalleVentaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleVentas to fetch.
     */
    orderBy?: DetalleVentaOrderByWithRelationInput | DetalleVentaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DetalleVentas.
     */
    cursor?: DetalleVentaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleVentas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleVentas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DetalleVentas.
     */
    distinct?: DetalleVentaScalarFieldEnum | DetalleVentaScalarFieldEnum[]
  }

  /**
   * DetalleVenta create
   */
  export type DetalleVentaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    /**
     * The data needed to create a DetalleVenta.
     */
    data: XOR<DetalleVentaCreateInput, DetalleVentaUncheckedCreateInput>
  }

  /**
   * DetalleVenta createMany
   */
  export type DetalleVentaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DetalleVentas.
     */
    data: DetalleVentaCreateManyInput | DetalleVentaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DetalleVenta createManyAndReturn
   */
  export type DetalleVentaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * The data used to create many DetalleVentas.
     */
    data: DetalleVentaCreateManyInput | DetalleVentaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DetalleVenta update
   */
  export type DetalleVentaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    /**
     * The data needed to update a DetalleVenta.
     */
    data: XOR<DetalleVentaUpdateInput, DetalleVentaUncheckedUpdateInput>
    /**
     * Choose, which DetalleVenta to update.
     */
    where: DetalleVentaWhereUniqueInput
  }

  /**
   * DetalleVenta updateMany
   */
  export type DetalleVentaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DetalleVentas.
     */
    data: XOR<DetalleVentaUpdateManyMutationInput, DetalleVentaUncheckedUpdateManyInput>
    /**
     * Filter which DetalleVentas to update
     */
    where?: DetalleVentaWhereInput
    /**
     * Limit how many DetalleVentas to update.
     */
    limit?: number
  }

  /**
   * DetalleVenta updateManyAndReturn
   */
  export type DetalleVentaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * The data used to update DetalleVentas.
     */
    data: XOR<DetalleVentaUpdateManyMutationInput, DetalleVentaUncheckedUpdateManyInput>
    /**
     * Filter which DetalleVentas to update
     */
    where?: DetalleVentaWhereInput
    /**
     * Limit how many DetalleVentas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DetalleVenta upsert
   */
  export type DetalleVentaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    /**
     * The filter to search for the DetalleVenta to update in case it exists.
     */
    where: DetalleVentaWhereUniqueInput
    /**
     * In case the DetalleVenta found by the `where` argument doesn't exist, create a new DetalleVenta with this data.
     */
    create: XOR<DetalleVentaCreateInput, DetalleVentaUncheckedCreateInput>
    /**
     * In case the DetalleVenta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DetalleVentaUpdateInput, DetalleVentaUncheckedUpdateInput>
  }

  /**
   * DetalleVenta delete
   */
  export type DetalleVentaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
    /**
     * Filter which DetalleVenta to delete.
     */
    where: DetalleVentaWhereUniqueInput
  }

  /**
   * DetalleVenta deleteMany
   */
  export type DetalleVentaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DetalleVentas to delete
     */
    where?: DetalleVentaWhereInput
    /**
     * Limit how many DetalleVentas to delete.
     */
    limit?: number
  }

  /**
   * DetalleVenta without action
   */
  export type DetalleVentaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleVenta
     */
    select?: DetalleVentaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleVenta
     */
    omit?: DetalleVentaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleVentaInclude<ExtArgs> | null
  }


  /**
   * Model EntradaMercaderia
   */

  export type AggregateEntradaMercaderia = {
    _count: EntradaMercaderiaCountAggregateOutputType | null
    _avg: EntradaMercaderiaAvgAggregateOutputType | null
    _sum: EntradaMercaderiaSumAggregateOutputType | null
    _min: EntradaMercaderiaMinAggregateOutputType | null
    _max: EntradaMercaderiaMaxAggregateOutputType | null
  }

  export type EntradaMercaderiaAvgAggregateOutputType = {
    id: number | null
    productoId: number | null
    proveedorId: number | null
    cantidad: number | null
    precioUnitario: Decimal | null
    usuarioId: number | null
  }

  export type EntradaMercaderiaSumAggregateOutputType = {
    id: number | null
    productoId: number | null
    proveedorId: number | null
    cantidad: number | null
    precioUnitario: Decimal | null
    usuarioId: number | null
  }

  export type EntradaMercaderiaMinAggregateOutputType = {
    id: number | null
    productoId: number | null
    proveedorId: number | null
    cantidad: number | null
    precioUnitario: Decimal | null
    usuarioId: number | null
    creadoEn: Date | null
  }

  export type EntradaMercaderiaMaxAggregateOutputType = {
    id: number | null
    productoId: number | null
    proveedorId: number | null
    cantidad: number | null
    precioUnitario: Decimal | null
    usuarioId: number | null
    creadoEn: Date | null
  }

  export type EntradaMercaderiaCountAggregateOutputType = {
    id: number
    productoId: number
    proveedorId: number
    cantidad: number
    precioUnitario: number
    usuarioId: number
    creadoEn: number
    _all: number
  }


  export type EntradaMercaderiaAvgAggregateInputType = {
    id?: true
    productoId?: true
    proveedorId?: true
    cantidad?: true
    precioUnitario?: true
    usuarioId?: true
  }

  export type EntradaMercaderiaSumAggregateInputType = {
    id?: true
    productoId?: true
    proveedorId?: true
    cantidad?: true
    precioUnitario?: true
    usuarioId?: true
  }

  export type EntradaMercaderiaMinAggregateInputType = {
    id?: true
    productoId?: true
    proveedorId?: true
    cantidad?: true
    precioUnitario?: true
    usuarioId?: true
    creadoEn?: true
  }

  export type EntradaMercaderiaMaxAggregateInputType = {
    id?: true
    productoId?: true
    proveedorId?: true
    cantidad?: true
    precioUnitario?: true
    usuarioId?: true
    creadoEn?: true
  }

  export type EntradaMercaderiaCountAggregateInputType = {
    id?: true
    productoId?: true
    proveedorId?: true
    cantidad?: true
    precioUnitario?: true
    usuarioId?: true
    creadoEn?: true
    _all?: true
  }

  export type EntradaMercaderiaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntradaMercaderia to aggregate.
     */
    where?: EntradaMercaderiaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntradaMercaderias to fetch.
     */
    orderBy?: EntradaMercaderiaOrderByWithRelationInput | EntradaMercaderiaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntradaMercaderiaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntradaMercaderias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntradaMercaderias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EntradaMercaderias
    **/
    _count?: true | EntradaMercaderiaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntradaMercaderiaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntradaMercaderiaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntradaMercaderiaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntradaMercaderiaMaxAggregateInputType
  }

  export type GetEntradaMercaderiaAggregateType<T extends EntradaMercaderiaAggregateArgs> = {
        [P in keyof T & keyof AggregateEntradaMercaderia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntradaMercaderia[P]>
      : GetScalarType<T[P], AggregateEntradaMercaderia[P]>
  }




  export type EntradaMercaderiaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntradaMercaderiaWhereInput
    orderBy?: EntradaMercaderiaOrderByWithAggregationInput | EntradaMercaderiaOrderByWithAggregationInput[]
    by: EntradaMercaderiaScalarFieldEnum[] | EntradaMercaderiaScalarFieldEnum
    having?: EntradaMercaderiaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntradaMercaderiaCountAggregateInputType | true
    _avg?: EntradaMercaderiaAvgAggregateInputType
    _sum?: EntradaMercaderiaSumAggregateInputType
    _min?: EntradaMercaderiaMinAggregateInputType
    _max?: EntradaMercaderiaMaxAggregateInputType
  }

  export type EntradaMercaderiaGroupByOutputType = {
    id: number
    productoId: number
    proveedorId: number
    cantidad: number
    precioUnitario: Decimal
    usuarioId: number
    creadoEn: Date
    _count: EntradaMercaderiaCountAggregateOutputType | null
    _avg: EntradaMercaderiaAvgAggregateOutputType | null
    _sum: EntradaMercaderiaSumAggregateOutputType | null
    _min: EntradaMercaderiaMinAggregateOutputType | null
    _max: EntradaMercaderiaMaxAggregateOutputType | null
  }

  type GetEntradaMercaderiaGroupByPayload<T extends EntradaMercaderiaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntradaMercaderiaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntradaMercaderiaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntradaMercaderiaGroupByOutputType[P]>
            : GetScalarType<T[P], EntradaMercaderiaGroupByOutputType[P]>
        }
      >
    >


  export type EntradaMercaderiaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    proveedorId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    usuarioId?: boolean
    creadoEn?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    proveedor?: boolean | ProveedorDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entradaMercaderia"]>

  export type EntradaMercaderiaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    proveedorId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    usuarioId?: boolean
    creadoEn?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    proveedor?: boolean | ProveedorDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entradaMercaderia"]>

  export type EntradaMercaderiaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    proveedorId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    usuarioId?: boolean
    creadoEn?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    proveedor?: boolean | ProveedorDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entradaMercaderia"]>

  export type EntradaMercaderiaSelectScalar = {
    id?: boolean
    productoId?: boolean
    proveedorId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    usuarioId?: boolean
    creadoEn?: boolean
  }

  export type EntradaMercaderiaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productoId" | "proveedorId" | "cantidad" | "precioUnitario" | "usuarioId" | "creadoEn", ExtArgs["result"]["entradaMercaderia"]>
  export type EntradaMercaderiaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    proveedor?: boolean | ProveedorDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type EntradaMercaderiaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    proveedor?: boolean | ProveedorDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type EntradaMercaderiaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    proveedor?: boolean | ProveedorDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $EntradaMercaderiaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EntradaMercaderia"
    objects: {
      producto: Prisma.$ProductoPayload<ExtArgs>
      proveedor: Prisma.$ProveedorPayload<ExtArgs>
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productoId: number
      proveedorId: number
      cantidad: number
      precioUnitario: Prisma.Decimal
      usuarioId: number
      creadoEn: Date
    }, ExtArgs["result"]["entradaMercaderia"]>
    composites: {}
  }

  type EntradaMercaderiaGetPayload<S extends boolean | null | undefined | EntradaMercaderiaDefaultArgs> = $Result.GetResult<Prisma.$EntradaMercaderiaPayload, S>

  type EntradaMercaderiaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EntradaMercaderiaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EntradaMercaderiaCountAggregateInputType | true
    }

  export interface EntradaMercaderiaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EntradaMercaderia'], meta: { name: 'EntradaMercaderia' } }
    /**
     * Find zero or one EntradaMercaderia that matches the filter.
     * @param {EntradaMercaderiaFindUniqueArgs} args - Arguments to find a EntradaMercaderia
     * @example
     * // Get one EntradaMercaderia
     * const entradaMercaderia = await prisma.entradaMercaderia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntradaMercaderiaFindUniqueArgs>(args: SelectSubset<T, EntradaMercaderiaFindUniqueArgs<ExtArgs>>): Prisma__EntradaMercaderiaClient<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EntradaMercaderia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntradaMercaderiaFindUniqueOrThrowArgs} args - Arguments to find a EntradaMercaderia
     * @example
     * // Get one EntradaMercaderia
     * const entradaMercaderia = await prisma.entradaMercaderia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntradaMercaderiaFindUniqueOrThrowArgs>(args: SelectSubset<T, EntradaMercaderiaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntradaMercaderiaClient<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntradaMercaderia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaMercaderiaFindFirstArgs} args - Arguments to find a EntradaMercaderia
     * @example
     * // Get one EntradaMercaderia
     * const entradaMercaderia = await prisma.entradaMercaderia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntradaMercaderiaFindFirstArgs>(args?: SelectSubset<T, EntradaMercaderiaFindFirstArgs<ExtArgs>>): Prisma__EntradaMercaderiaClient<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntradaMercaderia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaMercaderiaFindFirstOrThrowArgs} args - Arguments to find a EntradaMercaderia
     * @example
     * // Get one EntradaMercaderia
     * const entradaMercaderia = await prisma.entradaMercaderia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntradaMercaderiaFindFirstOrThrowArgs>(args?: SelectSubset<T, EntradaMercaderiaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntradaMercaderiaClient<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EntradaMercaderias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaMercaderiaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EntradaMercaderias
     * const entradaMercaderias = await prisma.entradaMercaderia.findMany()
     * 
     * // Get first 10 EntradaMercaderias
     * const entradaMercaderias = await prisma.entradaMercaderia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entradaMercaderiaWithIdOnly = await prisma.entradaMercaderia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EntradaMercaderiaFindManyArgs>(args?: SelectSubset<T, EntradaMercaderiaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EntradaMercaderia.
     * @param {EntradaMercaderiaCreateArgs} args - Arguments to create a EntradaMercaderia.
     * @example
     * // Create one EntradaMercaderia
     * const EntradaMercaderia = await prisma.entradaMercaderia.create({
     *   data: {
     *     // ... data to create a EntradaMercaderia
     *   }
     * })
     * 
     */
    create<T extends EntradaMercaderiaCreateArgs>(args: SelectSubset<T, EntradaMercaderiaCreateArgs<ExtArgs>>): Prisma__EntradaMercaderiaClient<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EntradaMercaderias.
     * @param {EntradaMercaderiaCreateManyArgs} args - Arguments to create many EntradaMercaderias.
     * @example
     * // Create many EntradaMercaderias
     * const entradaMercaderia = await prisma.entradaMercaderia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntradaMercaderiaCreateManyArgs>(args?: SelectSubset<T, EntradaMercaderiaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EntradaMercaderias and returns the data saved in the database.
     * @param {EntradaMercaderiaCreateManyAndReturnArgs} args - Arguments to create many EntradaMercaderias.
     * @example
     * // Create many EntradaMercaderias
     * const entradaMercaderia = await prisma.entradaMercaderia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EntradaMercaderias and only return the `id`
     * const entradaMercaderiaWithIdOnly = await prisma.entradaMercaderia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntradaMercaderiaCreateManyAndReturnArgs>(args?: SelectSubset<T, EntradaMercaderiaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EntradaMercaderia.
     * @param {EntradaMercaderiaDeleteArgs} args - Arguments to delete one EntradaMercaderia.
     * @example
     * // Delete one EntradaMercaderia
     * const EntradaMercaderia = await prisma.entradaMercaderia.delete({
     *   where: {
     *     // ... filter to delete one EntradaMercaderia
     *   }
     * })
     * 
     */
    delete<T extends EntradaMercaderiaDeleteArgs>(args: SelectSubset<T, EntradaMercaderiaDeleteArgs<ExtArgs>>): Prisma__EntradaMercaderiaClient<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EntradaMercaderia.
     * @param {EntradaMercaderiaUpdateArgs} args - Arguments to update one EntradaMercaderia.
     * @example
     * // Update one EntradaMercaderia
     * const entradaMercaderia = await prisma.entradaMercaderia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntradaMercaderiaUpdateArgs>(args: SelectSubset<T, EntradaMercaderiaUpdateArgs<ExtArgs>>): Prisma__EntradaMercaderiaClient<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EntradaMercaderias.
     * @param {EntradaMercaderiaDeleteManyArgs} args - Arguments to filter EntradaMercaderias to delete.
     * @example
     * // Delete a few EntradaMercaderias
     * const { count } = await prisma.entradaMercaderia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntradaMercaderiaDeleteManyArgs>(args?: SelectSubset<T, EntradaMercaderiaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntradaMercaderias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaMercaderiaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EntradaMercaderias
     * const entradaMercaderia = await prisma.entradaMercaderia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntradaMercaderiaUpdateManyArgs>(args: SelectSubset<T, EntradaMercaderiaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntradaMercaderias and returns the data updated in the database.
     * @param {EntradaMercaderiaUpdateManyAndReturnArgs} args - Arguments to update many EntradaMercaderias.
     * @example
     * // Update many EntradaMercaderias
     * const entradaMercaderia = await prisma.entradaMercaderia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EntradaMercaderias and only return the `id`
     * const entradaMercaderiaWithIdOnly = await prisma.entradaMercaderia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EntradaMercaderiaUpdateManyAndReturnArgs>(args: SelectSubset<T, EntradaMercaderiaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EntradaMercaderia.
     * @param {EntradaMercaderiaUpsertArgs} args - Arguments to update or create a EntradaMercaderia.
     * @example
     * // Update or create a EntradaMercaderia
     * const entradaMercaderia = await prisma.entradaMercaderia.upsert({
     *   create: {
     *     // ... data to create a EntradaMercaderia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EntradaMercaderia we want to update
     *   }
     * })
     */
    upsert<T extends EntradaMercaderiaUpsertArgs>(args: SelectSubset<T, EntradaMercaderiaUpsertArgs<ExtArgs>>): Prisma__EntradaMercaderiaClient<$Result.GetResult<Prisma.$EntradaMercaderiaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EntradaMercaderias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaMercaderiaCountArgs} args - Arguments to filter EntradaMercaderias to count.
     * @example
     * // Count the number of EntradaMercaderias
     * const count = await prisma.entradaMercaderia.count({
     *   where: {
     *     // ... the filter for the EntradaMercaderias we want to count
     *   }
     * })
    **/
    count<T extends EntradaMercaderiaCountArgs>(
      args?: Subset<T, EntradaMercaderiaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntradaMercaderiaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EntradaMercaderia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaMercaderiaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntradaMercaderiaAggregateArgs>(args: Subset<T, EntradaMercaderiaAggregateArgs>): Prisma.PrismaPromise<GetEntradaMercaderiaAggregateType<T>>

    /**
     * Group by EntradaMercaderia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaMercaderiaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntradaMercaderiaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntradaMercaderiaGroupByArgs['orderBy'] }
        : { orderBy?: EntradaMercaderiaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntradaMercaderiaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntradaMercaderiaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EntradaMercaderia model
   */
  readonly fields: EntradaMercaderiaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EntradaMercaderia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntradaMercaderiaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    proveedor<T extends ProveedorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProveedorDefaultArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EntradaMercaderia model
   */
  interface EntradaMercaderiaFieldRefs {
    readonly id: FieldRef<"EntradaMercaderia", 'Int'>
    readonly productoId: FieldRef<"EntradaMercaderia", 'Int'>
    readonly proveedorId: FieldRef<"EntradaMercaderia", 'Int'>
    readonly cantidad: FieldRef<"EntradaMercaderia", 'Int'>
    readonly precioUnitario: FieldRef<"EntradaMercaderia", 'Decimal'>
    readonly usuarioId: FieldRef<"EntradaMercaderia", 'Int'>
    readonly creadoEn: FieldRef<"EntradaMercaderia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EntradaMercaderia findUnique
   */
  export type EntradaMercaderiaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    /**
     * Filter, which EntradaMercaderia to fetch.
     */
    where: EntradaMercaderiaWhereUniqueInput
  }

  /**
   * EntradaMercaderia findUniqueOrThrow
   */
  export type EntradaMercaderiaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    /**
     * Filter, which EntradaMercaderia to fetch.
     */
    where: EntradaMercaderiaWhereUniqueInput
  }

  /**
   * EntradaMercaderia findFirst
   */
  export type EntradaMercaderiaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    /**
     * Filter, which EntradaMercaderia to fetch.
     */
    where?: EntradaMercaderiaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntradaMercaderias to fetch.
     */
    orderBy?: EntradaMercaderiaOrderByWithRelationInput | EntradaMercaderiaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntradaMercaderias.
     */
    cursor?: EntradaMercaderiaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntradaMercaderias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntradaMercaderias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntradaMercaderias.
     */
    distinct?: EntradaMercaderiaScalarFieldEnum | EntradaMercaderiaScalarFieldEnum[]
  }

  /**
   * EntradaMercaderia findFirstOrThrow
   */
  export type EntradaMercaderiaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    /**
     * Filter, which EntradaMercaderia to fetch.
     */
    where?: EntradaMercaderiaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntradaMercaderias to fetch.
     */
    orderBy?: EntradaMercaderiaOrderByWithRelationInput | EntradaMercaderiaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntradaMercaderias.
     */
    cursor?: EntradaMercaderiaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntradaMercaderias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntradaMercaderias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntradaMercaderias.
     */
    distinct?: EntradaMercaderiaScalarFieldEnum | EntradaMercaderiaScalarFieldEnum[]
  }

  /**
   * EntradaMercaderia findMany
   */
  export type EntradaMercaderiaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    /**
     * Filter, which EntradaMercaderias to fetch.
     */
    where?: EntradaMercaderiaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntradaMercaderias to fetch.
     */
    orderBy?: EntradaMercaderiaOrderByWithRelationInput | EntradaMercaderiaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EntradaMercaderias.
     */
    cursor?: EntradaMercaderiaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntradaMercaderias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntradaMercaderias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntradaMercaderias.
     */
    distinct?: EntradaMercaderiaScalarFieldEnum | EntradaMercaderiaScalarFieldEnum[]
  }

  /**
   * EntradaMercaderia create
   */
  export type EntradaMercaderiaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    /**
     * The data needed to create a EntradaMercaderia.
     */
    data: XOR<EntradaMercaderiaCreateInput, EntradaMercaderiaUncheckedCreateInput>
  }

  /**
   * EntradaMercaderia createMany
   */
  export type EntradaMercaderiaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EntradaMercaderias.
     */
    data: EntradaMercaderiaCreateManyInput | EntradaMercaderiaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EntradaMercaderia createManyAndReturn
   */
  export type EntradaMercaderiaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * The data used to create many EntradaMercaderias.
     */
    data: EntradaMercaderiaCreateManyInput | EntradaMercaderiaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntradaMercaderia update
   */
  export type EntradaMercaderiaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    /**
     * The data needed to update a EntradaMercaderia.
     */
    data: XOR<EntradaMercaderiaUpdateInput, EntradaMercaderiaUncheckedUpdateInput>
    /**
     * Choose, which EntradaMercaderia to update.
     */
    where: EntradaMercaderiaWhereUniqueInput
  }

  /**
   * EntradaMercaderia updateMany
   */
  export type EntradaMercaderiaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EntradaMercaderias.
     */
    data: XOR<EntradaMercaderiaUpdateManyMutationInput, EntradaMercaderiaUncheckedUpdateManyInput>
    /**
     * Filter which EntradaMercaderias to update
     */
    where?: EntradaMercaderiaWhereInput
    /**
     * Limit how many EntradaMercaderias to update.
     */
    limit?: number
  }

  /**
   * EntradaMercaderia updateManyAndReturn
   */
  export type EntradaMercaderiaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * The data used to update EntradaMercaderias.
     */
    data: XOR<EntradaMercaderiaUpdateManyMutationInput, EntradaMercaderiaUncheckedUpdateManyInput>
    /**
     * Filter which EntradaMercaderias to update
     */
    where?: EntradaMercaderiaWhereInput
    /**
     * Limit how many EntradaMercaderias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntradaMercaderia upsert
   */
  export type EntradaMercaderiaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    /**
     * The filter to search for the EntradaMercaderia to update in case it exists.
     */
    where: EntradaMercaderiaWhereUniqueInput
    /**
     * In case the EntradaMercaderia found by the `where` argument doesn't exist, create a new EntradaMercaderia with this data.
     */
    create: XOR<EntradaMercaderiaCreateInput, EntradaMercaderiaUncheckedCreateInput>
    /**
     * In case the EntradaMercaderia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntradaMercaderiaUpdateInput, EntradaMercaderiaUncheckedUpdateInput>
  }

  /**
   * EntradaMercaderia delete
   */
  export type EntradaMercaderiaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
    /**
     * Filter which EntradaMercaderia to delete.
     */
    where: EntradaMercaderiaWhereUniqueInput
  }

  /**
   * EntradaMercaderia deleteMany
   */
  export type EntradaMercaderiaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntradaMercaderias to delete
     */
    where?: EntradaMercaderiaWhereInput
    /**
     * Limit how many EntradaMercaderias to delete.
     */
    limit?: number
  }

  /**
   * EntradaMercaderia without action
   */
  export type EntradaMercaderiaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaMercaderia
     */
    select?: EntradaMercaderiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaMercaderia
     */
    omit?: EntradaMercaderiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaMercaderiaInclude<ExtArgs> | null
  }


  /**
   * Model BajaInventario
   */

  export type AggregateBajaInventario = {
    _count: BajaInventarioCountAggregateOutputType | null
    _avg: BajaInventarioAvgAggregateOutputType | null
    _sum: BajaInventarioSumAggregateOutputType | null
    _min: BajaInventarioMinAggregateOutputType | null
    _max: BajaInventarioMaxAggregateOutputType | null
  }

  export type BajaInventarioAvgAggregateOutputType = {
    id: number | null
    productoId: number | null
    cantidad: number | null
    usuarioId: number | null
  }

  export type BajaInventarioSumAggregateOutputType = {
    id: number | null
    productoId: number | null
    cantidad: number | null
    usuarioId: number | null
  }

  export type BajaInventarioMinAggregateOutputType = {
    id: number | null
    productoId: number | null
    cantidad: number | null
    motivo: string | null
    usuarioId: number | null
    creadoEn: Date | null
  }

  export type BajaInventarioMaxAggregateOutputType = {
    id: number | null
    productoId: number | null
    cantidad: number | null
    motivo: string | null
    usuarioId: number | null
    creadoEn: Date | null
  }

  export type BajaInventarioCountAggregateOutputType = {
    id: number
    productoId: number
    cantidad: number
    motivo: number
    usuarioId: number
    creadoEn: number
    _all: number
  }


  export type BajaInventarioAvgAggregateInputType = {
    id?: true
    productoId?: true
    cantidad?: true
    usuarioId?: true
  }

  export type BajaInventarioSumAggregateInputType = {
    id?: true
    productoId?: true
    cantidad?: true
    usuarioId?: true
  }

  export type BajaInventarioMinAggregateInputType = {
    id?: true
    productoId?: true
    cantidad?: true
    motivo?: true
    usuarioId?: true
    creadoEn?: true
  }

  export type BajaInventarioMaxAggregateInputType = {
    id?: true
    productoId?: true
    cantidad?: true
    motivo?: true
    usuarioId?: true
    creadoEn?: true
  }

  export type BajaInventarioCountAggregateInputType = {
    id?: true
    productoId?: true
    cantidad?: true
    motivo?: true
    usuarioId?: true
    creadoEn?: true
    _all?: true
  }

  export type BajaInventarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BajaInventario to aggregate.
     */
    where?: BajaInventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BajaInventarios to fetch.
     */
    orderBy?: BajaInventarioOrderByWithRelationInput | BajaInventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BajaInventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BajaInventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BajaInventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BajaInventarios
    **/
    _count?: true | BajaInventarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BajaInventarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BajaInventarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BajaInventarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BajaInventarioMaxAggregateInputType
  }

  export type GetBajaInventarioAggregateType<T extends BajaInventarioAggregateArgs> = {
        [P in keyof T & keyof AggregateBajaInventario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBajaInventario[P]>
      : GetScalarType<T[P], AggregateBajaInventario[P]>
  }




  export type BajaInventarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BajaInventarioWhereInput
    orderBy?: BajaInventarioOrderByWithAggregationInput | BajaInventarioOrderByWithAggregationInput[]
    by: BajaInventarioScalarFieldEnum[] | BajaInventarioScalarFieldEnum
    having?: BajaInventarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BajaInventarioCountAggregateInputType | true
    _avg?: BajaInventarioAvgAggregateInputType
    _sum?: BajaInventarioSumAggregateInputType
    _min?: BajaInventarioMinAggregateInputType
    _max?: BajaInventarioMaxAggregateInputType
  }

  export type BajaInventarioGroupByOutputType = {
    id: number
    productoId: number
    cantidad: number
    motivo: string
    usuarioId: number
    creadoEn: Date
    _count: BajaInventarioCountAggregateOutputType | null
    _avg: BajaInventarioAvgAggregateOutputType | null
    _sum: BajaInventarioSumAggregateOutputType | null
    _min: BajaInventarioMinAggregateOutputType | null
    _max: BajaInventarioMaxAggregateOutputType | null
  }

  type GetBajaInventarioGroupByPayload<T extends BajaInventarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BajaInventarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BajaInventarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BajaInventarioGroupByOutputType[P]>
            : GetScalarType<T[P], BajaInventarioGroupByOutputType[P]>
        }
      >
    >


  export type BajaInventarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    cantidad?: boolean
    motivo?: boolean
    usuarioId?: boolean
    creadoEn?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bajaInventario"]>

  export type BajaInventarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    cantidad?: boolean
    motivo?: boolean
    usuarioId?: boolean
    creadoEn?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bajaInventario"]>

  export type BajaInventarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    cantidad?: boolean
    motivo?: boolean
    usuarioId?: boolean
    creadoEn?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bajaInventario"]>

  export type BajaInventarioSelectScalar = {
    id?: boolean
    productoId?: boolean
    cantidad?: boolean
    motivo?: boolean
    usuarioId?: boolean
    creadoEn?: boolean
  }

  export type BajaInventarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productoId" | "cantidad" | "motivo" | "usuarioId" | "creadoEn", ExtArgs["result"]["bajaInventario"]>
  export type BajaInventarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type BajaInventarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type BajaInventarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $BajaInventarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BajaInventario"
    objects: {
      producto: Prisma.$ProductoPayload<ExtArgs>
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productoId: number
      cantidad: number
      motivo: string
      usuarioId: number
      creadoEn: Date
    }, ExtArgs["result"]["bajaInventario"]>
    composites: {}
  }

  type BajaInventarioGetPayload<S extends boolean | null | undefined | BajaInventarioDefaultArgs> = $Result.GetResult<Prisma.$BajaInventarioPayload, S>

  type BajaInventarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BajaInventarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BajaInventarioCountAggregateInputType | true
    }

  export interface BajaInventarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BajaInventario'], meta: { name: 'BajaInventario' } }
    /**
     * Find zero or one BajaInventario that matches the filter.
     * @param {BajaInventarioFindUniqueArgs} args - Arguments to find a BajaInventario
     * @example
     * // Get one BajaInventario
     * const bajaInventario = await prisma.bajaInventario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BajaInventarioFindUniqueArgs>(args: SelectSubset<T, BajaInventarioFindUniqueArgs<ExtArgs>>): Prisma__BajaInventarioClient<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BajaInventario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BajaInventarioFindUniqueOrThrowArgs} args - Arguments to find a BajaInventario
     * @example
     * // Get one BajaInventario
     * const bajaInventario = await prisma.bajaInventario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BajaInventarioFindUniqueOrThrowArgs>(args: SelectSubset<T, BajaInventarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BajaInventarioClient<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BajaInventario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BajaInventarioFindFirstArgs} args - Arguments to find a BajaInventario
     * @example
     * // Get one BajaInventario
     * const bajaInventario = await prisma.bajaInventario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BajaInventarioFindFirstArgs>(args?: SelectSubset<T, BajaInventarioFindFirstArgs<ExtArgs>>): Prisma__BajaInventarioClient<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BajaInventario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BajaInventarioFindFirstOrThrowArgs} args - Arguments to find a BajaInventario
     * @example
     * // Get one BajaInventario
     * const bajaInventario = await prisma.bajaInventario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BajaInventarioFindFirstOrThrowArgs>(args?: SelectSubset<T, BajaInventarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__BajaInventarioClient<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BajaInventarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BajaInventarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BajaInventarios
     * const bajaInventarios = await prisma.bajaInventario.findMany()
     * 
     * // Get first 10 BajaInventarios
     * const bajaInventarios = await prisma.bajaInventario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bajaInventarioWithIdOnly = await prisma.bajaInventario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BajaInventarioFindManyArgs>(args?: SelectSubset<T, BajaInventarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BajaInventario.
     * @param {BajaInventarioCreateArgs} args - Arguments to create a BajaInventario.
     * @example
     * // Create one BajaInventario
     * const BajaInventario = await prisma.bajaInventario.create({
     *   data: {
     *     // ... data to create a BajaInventario
     *   }
     * })
     * 
     */
    create<T extends BajaInventarioCreateArgs>(args: SelectSubset<T, BajaInventarioCreateArgs<ExtArgs>>): Prisma__BajaInventarioClient<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BajaInventarios.
     * @param {BajaInventarioCreateManyArgs} args - Arguments to create many BajaInventarios.
     * @example
     * // Create many BajaInventarios
     * const bajaInventario = await prisma.bajaInventario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BajaInventarioCreateManyArgs>(args?: SelectSubset<T, BajaInventarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BajaInventarios and returns the data saved in the database.
     * @param {BajaInventarioCreateManyAndReturnArgs} args - Arguments to create many BajaInventarios.
     * @example
     * // Create many BajaInventarios
     * const bajaInventario = await prisma.bajaInventario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BajaInventarios and only return the `id`
     * const bajaInventarioWithIdOnly = await prisma.bajaInventario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BajaInventarioCreateManyAndReturnArgs>(args?: SelectSubset<T, BajaInventarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BajaInventario.
     * @param {BajaInventarioDeleteArgs} args - Arguments to delete one BajaInventario.
     * @example
     * // Delete one BajaInventario
     * const BajaInventario = await prisma.bajaInventario.delete({
     *   where: {
     *     // ... filter to delete one BajaInventario
     *   }
     * })
     * 
     */
    delete<T extends BajaInventarioDeleteArgs>(args: SelectSubset<T, BajaInventarioDeleteArgs<ExtArgs>>): Prisma__BajaInventarioClient<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BajaInventario.
     * @param {BajaInventarioUpdateArgs} args - Arguments to update one BajaInventario.
     * @example
     * // Update one BajaInventario
     * const bajaInventario = await prisma.bajaInventario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BajaInventarioUpdateArgs>(args: SelectSubset<T, BajaInventarioUpdateArgs<ExtArgs>>): Prisma__BajaInventarioClient<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BajaInventarios.
     * @param {BajaInventarioDeleteManyArgs} args - Arguments to filter BajaInventarios to delete.
     * @example
     * // Delete a few BajaInventarios
     * const { count } = await prisma.bajaInventario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BajaInventarioDeleteManyArgs>(args?: SelectSubset<T, BajaInventarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BajaInventarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BajaInventarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BajaInventarios
     * const bajaInventario = await prisma.bajaInventario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BajaInventarioUpdateManyArgs>(args: SelectSubset<T, BajaInventarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BajaInventarios and returns the data updated in the database.
     * @param {BajaInventarioUpdateManyAndReturnArgs} args - Arguments to update many BajaInventarios.
     * @example
     * // Update many BajaInventarios
     * const bajaInventario = await prisma.bajaInventario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BajaInventarios and only return the `id`
     * const bajaInventarioWithIdOnly = await prisma.bajaInventario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BajaInventarioUpdateManyAndReturnArgs>(args: SelectSubset<T, BajaInventarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BajaInventario.
     * @param {BajaInventarioUpsertArgs} args - Arguments to update or create a BajaInventario.
     * @example
     * // Update or create a BajaInventario
     * const bajaInventario = await prisma.bajaInventario.upsert({
     *   create: {
     *     // ... data to create a BajaInventario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BajaInventario we want to update
     *   }
     * })
     */
    upsert<T extends BajaInventarioUpsertArgs>(args: SelectSubset<T, BajaInventarioUpsertArgs<ExtArgs>>): Prisma__BajaInventarioClient<$Result.GetResult<Prisma.$BajaInventarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BajaInventarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BajaInventarioCountArgs} args - Arguments to filter BajaInventarios to count.
     * @example
     * // Count the number of BajaInventarios
     * const count = await prisma.bajaInventario.count({
     *   where: {
     *     // ... the filter for the BajaInventarios we want to count
     *   }
     * })
    **/
    count<T extends BajaInventarioCountArgs>(
      args?: Subset<T, BajaInventarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BajaInventarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BajaInventario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BajaInventarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BajaInventarioAggregateArgs>(args: Subset<T, BajaInventarioAggregateArgs>): Prisma.PrismaPromise<GetBajaInventarioAggregateType<T>>

    /**
     * Group by BajaInventario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BajaInventarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BajaInventarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BajaInventarioGroupByArgs['orderBy'] }
        : { orderBy?: BajaInventarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BajaInventarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBajaInventarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BajaInventario model
   */
  readonly fields: BajaInventarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BajaInventario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BajaInventarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BajaInventario model
   */
  interface BajaInventarioFieldRefs {
    readonly id: FieldRef<"BajaInventario", 'Int'>
    readonly productoId: FieldRef<"BajaInventario", 'Int'>
    readonly cantidad: FieldRef<"BajaInventario", 'Int'>
    readonly motivo: FieldRef<"BajaInventario", 'String'>
    readonly usuarioId: FieldRef<"BajaInventario", 'Int'>
    readonly creadoEn: FieldRef<"BajaInventario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BajaInventario findUnique
   */
  export type BajaInventarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    /**
     * Filter, which BajaInventario to fetch.
     */
    where: BajaInventarioWhereUniqueInput
  }

  /**
   * BajaInventario findUniqueOrThrow
   */
  export type BajaInventarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    /**
     * Filter, which BajaInventario to fetch.
     */
    where: BajaInventarioWhereUniqueInput
  }

  /**
   * BajaInventario findFirst
   */
  export type BajaInventarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    /**
     * Filter, which BajaInventario to fetch.
     */
    where?: BajaInventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BajaInventarios to fetch.
     */
    orderBy?: BajaInventarioOrderByWithRelationInput | BajaInventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BajaInventarios.
     */
    cursor?: BajaInventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BajaInventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BajaInventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BajaInventarios.
     */
    distinct?: BajaInventarioScalarFieldEnum | BajaInventarioScalarFieldEnum[]
  }

  /**
   * BajaInventario findFirstOrThrow
   */
  export type BajaInventarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    /**
     * Filter, which BajaInventario to fetch.
     */
    where?: BajaInventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BajaInventarios to fetch.
     */
    orderBy?: BajaInventarioOrderByWithRelationInput | BajaInventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BajaInventarios.
     */
    cursor?: BajaInventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BajaInventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BajaInventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BajaInventarios.
     */
    distinct?: BajaInventarioScalarFieldEnum | BajaInventarioScalarFieldEnum[]
  }

  /**
   * BajaInventario findMany
   */
  export type BajaInventarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    /**
     * Filter, which BajaInventarios to fetch.
     */
    where?: BajaInventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BajaInventarios to fetch.
     */
    orderBy?: BajaInventarioOrderByWithRelationInput | BajaInventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BajaInventarios.
     */
    cursor?: BajaInventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BajaInventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BajaInventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BajaInventarios.
     */
    distinct?: BajaInventarioScalarFieldEnum | BajaInventarioScalarFieldEnum[]
  }

  /**
   * BajaInventario create
   */
  export type BajaInventarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    /**
     * The data needed to create a BajaInventario.
     */
    data: XOR<BajaInventarioCreateInput, BajaInventarioUncheckedCreateInput>
  }

  /**
   * BajaInventario createMany
   */
  export type BajaInventarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BajaInventarios.
     */
    data: BajaInventarioCreateManyInput | BajaInventarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BajaInventario createManyAndReturn
   */
  export type BajaInventarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * The data used to create many BajaInventarios.
     */
    data: BajaInventarioCreateManyInput | BajaInventarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BajaInventario update
   */
  export type BajaInventarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    /**
     * The data needed to update a BajaInventario.
     */
    data: XOR<BajaInventarioUpdateInput, BajaInventarioUncheckedUpdateInput>
    /**
     * Choose, which BajaInventario to update.
     */
    where: BajaInventarioWhereUniqueInput
  }

  /**
   * BajaInventario updateMany
   */
  export type BajaInventarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BajaInventarios.
     */
    data: XOR<BajaInventarioUpdateManyMutationInput, BajaInventarioUncheckedUpdateManyInput>
    /**
     * Filter which BajaInventarios to update
     */
    where?: BajaInventarioWhereInput
    /**
     * Limit how many BajaInventarios to update.
     */
    limit?: number
  }

  /**
   * BajaInventario updateManyAndReturn
   */
  export type BajaInventarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * The data used to update BajaInventarios.
     */
    data: XOR<BajaInventarioUpdateManyMutationInput, BajaInventarioUncheckedUpdateManyInput>
    /**
     * Filter which BajaInventarios to update
     */
    where?: BajaInventarioWhereInput
    /**
     * Limit how many BajaInventarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BajaInventario upsert
   */
  export type BajaInventarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    /**
     * The filter to search for the BajaInventario to update in case it exists.
     */
    where: BajaInventarioWhereUniqueInput
    /**
     * In case the BajaInventario found by the `where` argument doesn't exist, create a new BajaInventario with this data.
     */
    create: XOR<BajaInventarioCreateInput, BajaInventarioUncheckedCreateInput>
    /**
     * In case the BajaInventario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BajaInventarioUpdateInput, BajaInventarioUncheckedUpdateInput>
  }

  /**
   * BajaInventario delete
   */
  export type BajaInventarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
    /**
     * Filter which BajaInventario to delete.
     */
    where: BajaInventarioWhereUniqueInput
  }

  /**
   * BajaInventario deleteMany
   */
  export type BajaInventarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BajaInventarios to delete
     */
    where?: BajaInventarioWhereInput
    /**
     * Limit how many BajaInventarios to delete.
     */
    limit?: number
  }

  /**
   * BajaInventario without action
   */
  export type BajaInventarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BajaInventario
     */
    select?: BajaInventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BajaInventario
     */
    omit?: BajaInventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BajaInventarioInclude<ExtArgs> | null
  }


  /**
   * Model SolicitudReposicion
   */

  export type AggregateSolicitudReposicion = {
    _count: SolicitudReposicionCountAggregateOutputType | null
    _avg: SolicitudReposicionAvgAggregateOutputType | null
    _sum: SolicitudReposicionSumAggregateOutputType | null
    _min: SolicitudReposicionMinAggregateOutputType | null
    _max: SolicitudReposicionMaxAggregateOutputType | null
  }

  export type SolicitudReposicionAvgAggregateOutputType = {
    id: number | null
    productoId: number | null
    cantidadActual: number | null
    cantidadSolicitada: number | null
    usuarioId: number | null
    proveedorId: number | null
  }

  export type SolicitudReposicionSumAggregateOutputType = {
    id: number | null
    productoId: number | null
    cantidadActual: number | null
    cantidadSolicitada: number | null
    usuarioId: number | null
    proveedorId: number | null
  }

  export type SolicitudReposicionMinAggregateOutputType = {
    id: number | null
    productoId: number | null
    cantidadActual: number | null
    cantidadSolicitada: number | null
    estado: string | null
    usuarioId: number | null
    proveedorId: number | null
    fechaEstimada: Date | null
    notaRechazo: string | null
    creadoEn: Date | null
  }

  export type SolicitudReposicionMaxAggregateOutputType = {
    id: number | null
    productoId: number | null
    cantidadActual: number | null
    cantidadSolicitada: number | null
    estado: string | null
    usuarioId: number | null
    proveedorId: number | null
    fechaEstimada: Date | null
    notaRechazo: string | null
    creadoEn: Date | null
  }

  export type SolicitudReposicionCountAggregateOutputType = {
    id: number
    productoId: number
    cantidadActual: number
    cantidadSolicitada: number
    estado: number
    usuarioId: number
    proveedorId: number
    fechaEstimada: number
    notaRechazo: number
    creadoEn: number
    _all: number
  }


  export type SolicitudReposicionAvgAggregateInputType = {
    id?: true
    productoId?: true
    cantidadActual?: true
    cantidadSolicitada?: true
    usuarioId?: true
    proveedorId?: true
  }

  export type SolicitudReposicionSumAggregateInputType = {
    id?: true
    productoId?: true
    cantidadActual?: true
    cantidadSolicitada?: true
    usuarioId?: true
    proveedorId?: true
  }

  export type SolicitudReposicionMinAggregateInputType = {
    id?: true
    productoId?: true
    cantidadActual?: true
    cantidadSolicitada?: true
    estado?: true
    usuarioId?: true
    proveedorId?: true
    fechaEstimada?: true
    notaRechazo?: true
    creadoEn?: true
  }

  export type SolicitudReposicionMaxAggregateInputType = {
    id?: true
    productoId?: true
    cantidadActual?: true
    cantidadSolicitada?: true
    estado?: true
    usuarioId?: true
    proveedorId?: true
    fechaEstimada?: true
    notaRechazo?: true
    creadoEn?: true
  }

  export type SolicitudReposicionCountAggregateInputType = {
    id?: true
    productoId?: true
    cantidadActual?: true
    cantidadSolicitada?: true
    estado?: true
    usuarioId?: true
    proveedorId?: true
    fechaEstimada?: true
    notaRechazo?: true
    creadoEn?: true
    _all?: true
  }

  export type SolicitudReposicionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SolicitudReposicion to aggregate.
     */
    where?: SolicitudReposicionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SolicitudReposicions to fetch.
     */
    orderBy?: SolicitudReposicionOrderByWithRelationInput | SolicitudReposicionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SolicitudReposicionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SolicitudReposicions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SolicitudReposicions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SolicitudReposicions
    **/
    _count?: true | SolicitudReposicionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SolicitudReposicionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SolicitudReposicionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SolicitudReposicionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SolicitudReposicionMaxAggregateInputType
  }

  export type GetSolicitudReposicionAggregateType<T extends SolicitudReposicionAggregateArgs> = {
        [P in keyof T & keyof AggregateSolicitudReposicion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSolicitudReposicion[P]>
      : GetScalarType<T[P], AggregateSolicitudReposicion[P]>
  }




  export type SolicitudReposicionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitudReposicionWhereInput
    orderBy?: SolicitudReposicionOrderByWithAggregationInput | SolicitudReposicionOrderByWithAggregationInput[]
    by: SolicitudReposicionScalarFieldEnum[] | SolicitudReposicionScalarFieldEnum
    having?: SolicitudReposicionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SolicitudReposicionCountAggregateInputType | true
    _avg?: SolicitudReposicionAvgAggregateInputType
    _sum?: SolicitudReposicionSumAggregateInputType
    _min?: SolicitudReposicionMinAggregateInputType
    _max?: SolicitudReposicionMaxAggregateInputType
  }

  export type SolicitudReposicionGroupByOutputType = {
    id: number
    productoId: number
    cantidadActual: number
    cantidadSolicitada: number
    estado: string
    usuarioId: number
    proveedorId: number | null
    fechaEstimada: Date | null
    notaRechazo: string | null
    creadoEn: Date
    _count: SolicitudReposicionCountAggregateOutputType | null
    _avg: SolicitudReposicionAvgAggregateOutputType | null
    _sum: SolicitudReposicionSumAggregateOutputType | null
    _min: SolicitudReposicionMinAggregateOutputType | null
    _max: SolicitudReposicionMaxAggregateOutputType | null
  }

  type GetSolicitudReposicionGroupByPayload<T extends SolicitudReposicionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SolicitudReposicionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SolicitudReposicionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SolicitudReposicionGroupByOutputType[P]>
            : GetScalarType<T[P], SolicitudReposicionGroupByOutputType[P]>
        }
      >
    >


  export type SolicitudReposicionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    cantidadActual?: boolean
    cantidadSolicitada?: boolean
    estado?: boolean
    usuarioId?: boolean
    proveedorId?: boolean
    fechaEstimada?: boolean
    notaRechazo?: boolean
    creadoEn?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proveedor?: boolean | SolicitudReposicion$proveedorArgs<ExtArgs>
  }, ExtArgs["result"]["solicitudReposicion"]>

  export type SolicitudReposicionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    cantidadActual?: boolean
    cantidadSolicitada?: boolean
    estado?: boolean
    usuarioId?: boolean
    proveedorId?: boolean
    fechaEstimada?: boolean
    notaRechazo?: boolean
    creadoEn?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proveedor?: boolean | SolicitudReposicion$proveedorArgs<ExtArgs>
  }, ExtArgs["result"]["solicitudReposicion"]>

  export type SolicitudReposicionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    cantidadActual?: boolean
    cantidadSolicitada?: boolean
    estado?: boolean
    usuarioId?: boolean
    proveedorId?: boolean
    fechaEstimada?: boolean
    notaRechazo?: boolean
    creadoEn?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proveedor?: boolean | SolicitudReposicion$proveedorArgs<ExtArgs>
  }, ExtArgs["result"]["solicitudReposicion"]>

  export type SolicitudReposicionSelectScalar = {
    id?: boolean
    productoId?: boolean
    cantidadActual?: boolean
    cantidadSolicitada?: boolean
    estado?: boolean
    usuarioId?: boolean
    proveedorId?: boolean
    fechaEstimada?: boolean
    notaRechazo?: boolean
    creadoEn?: boolean
  }

  export type SolicitudReposicionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productoId" | "cantidadActual" | "cantidadSolicitada" | "estado" | "usuarioId" | "proveedorId" | "fechaEstimada" | "notaRechazo" | "creadoEn", ExtArgs["result"]["solicitudReposicion"]>
  export type SolicitudReposicionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proveedor?: boolean | SolicitudReposicion$proveedorArgs<ExtArgs>
  }
  export type SolicitudReposicionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proveedor?: boolean | SolicitudReposicion$proveedorArgs<ExtArgs>
  }
  export type SolicitudReposicionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    proveedor?: boolean | SolicitudReposicion$proveedorArgs<ExtArgs>
  }

  export type $SolicitudReposicionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SolicitudReposicion"
    objects: {
      producto: Prisma.$ProductoPayload<ExtArgs>
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      proveedor: Prisma.$ProveedorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productoId: number
      cantidadActual: number
      cantidadSolicitada: number
      estado: string
      usuarioId: number
      proveedorId: number | null
      fechaEstimada: Date | null
      notaRechazo: string | null
      creadoEn: Date
    }, ExtArgs["result"]["solicitudReposicion"]>
    composites: {}
  }

  type SolicitudReposicionGetPayload<S extends boolean | null | undefined | SolicitudReposicionDefaultArgs> = $Result.GetResult<Prisma.$SolicitudReposicionPayload, S>

  type SolicitudReposicionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SolicitudReposicionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SolicitudReposicionCountAggregateInputType | true
    }

  export interface SolicitudReposicionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SolicitudReposicion'], meta: { name: 'SolicitudReposicion' } }
    /**
     * Find zero or one SolicitudReposicion that matches the filter.
     * @param {SolicitudReposicionFindUniqueArgs} args - Arguments to find a SolicitudReposicion
     * @example
     * // Get one SolicitudReposicion
     * const solicitudReposicion = await prisma.solicitudReposicion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SolicitudReposicionFindUniqueArgs>(args: SelectSubset<T, SolicitudReposicionFindUniqueArgs<ExtArgs>>): Prisma__SolicitudReposicionClient<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SolicitudReposicion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SolicitudReposicionFindUniqueOrThrowArgs} args - Arguments to find a SolicitudReposicion
     * @example
     * // Get one SolicitudReposicion
     * const solicitudReposicion = await prisma.solicitudReposicion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SolicitudReposicionFindUniqueOrThrowArgs>(args: SelectSubset<T, SolicitudReposicionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SolicitudReposicionClient<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SolicitudReposicion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudReposicionFindFirstArgs} args - Arguments to find a SolicitudReposicion
     * @example
     * // Get one SolicitudReposicion
     * const solicitudReposicion = await prisma.solicitudReposicion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SolicitudReposicionFindFirstArgs>(args?: SelectSubset<T, SolicitudReposicionFindFirstArgs<ExtArgs>>): Prisma__SolicitudReposicionClient<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SolicitudReposicion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudReposicionFindFirstOrThrowArgs} args - Arguments to find a SolicitudReposicion
     * @example
     * // Get one SolicitudReposicion
     * const solicitudReposicion = await prisma.solicitudReposicion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SolicitudReposicionFindFirstOrThrowArgs>(args?: SelectSubset<T, SolicitudReposicionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SolicitudReposicionClient<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SolicitudReposicions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudReposicionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SolicitudReposicions
     * const solicitudReposicions = await prisma.solicitudReposicion.findMany()
     * 
     * // Get first 10 SolicitudReposicions
     * const solicitudReposicions = await prisma.solicitudReposicion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const solicitudReposicionWithIdOnly = await prisma.solicitudReposicion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SolicitudReposicionFindManyArgs>(args?: SelectSubset<T, SolicitudReposicionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SolicitudReposicion.
     * @param {SolicitudReposicionCreateArgs} args - Arguments to create a SolicitudReposicion.
     * @example
     * // Create one SolicitudReposicion
     * const SolicitudReposicion = await prisma.solicitudReposicion.create({
     *   data: {
     *     // ... data to create a SolicitudReposicion
     *   }
     * })
     * 
     */
    create<T extends SolicitudReposicionCreateArgs>(args: SelectSubset<T, SolicitudReposicionCreateArgs<ExtArgs>>): Prisma__SolicitudReposicionClient<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SolicitudReposicions.
     * @param {SolicitudReposicionCreateManyArgs} args - Arguments to create many SolicitudReposicions.
     * @example
     * // Create many SolicitudReposicions
     * const solicitudReposicion = await prisma.solicitudReposicion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SolicitudReposicionCreateManyArgs>(args?: SelectSubset<T, SolicitudReposicionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SolicitudReposicions and returns the data saved in the database.
     * @param {SolicitudReposicionCreateManyAndReturnArgs} args - Arguments to create many SolicitudReposicions.
     * @example
     * // Create many SolicitudReposicions
     * const solicitudReposicion = await prisma.solicitudReposicion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SolicitudReposicions and only return the `id`
     * const solicitudReposicionWithIdOnly = await prisma.solicitudReposicion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SolicitudReposicionCreateManyAndReturnArgs>(args?: SelectSubset<T, SolicitudReposicionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SolicitudReposicion.
     * @param {SolicitudReposicionDeleteArgs} args - Arguments to delete one SolicitudReposicion.
     * @example
     * // Delete one SolicitudReposicion
     * const SolicitudReposicion = await prisma.solicitudReposicion.delete({
     *   where: {
     *     // ... filter to delete one SolicitudReposicion
     *   }
     * })
     * 
     */
    delete<T extends SolicitudReposicionDeleteArgs>(args: SelectSubset<T, SolicitudReposicionDeleteArgs<ExtArgs>>): Prisma__SolicitudReposicionClient<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SolicitudReposicion.
     * @param {SolicitudReposicionUpdateArgs} args - Arguments to update one SolicitudReposicion.
     * @example
     * // Update one SolicitudReposicion
     * const solicitudReposicion = await prisma.solicitudReposicion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SolicitudReposicionUpdateArgs>(args: SelectSubset<T, SolicitudReposicionUpdateArgs<ExtArgs>>): Prisma__SolicitudReposicionClient<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SolicitudReposicions.
     * @param {SolicitudReposicionDeleteManyArgs} args - Arguments to filter SolicitudReposicions to delete.
     * @example
     * // Delete a few SolicitudReposicions
     * const { count } = await prisma.solicitudReposicion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SolicitudReposicionDeleteManyArgs>(args?: SelectSubset<T, SolicitudReposicionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SolicitudReposicions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudReposicionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SolicitudReposicions
     * const solicitudReposicion = await prisma.solicitudReposicion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SolicitudReposicionUpdateManyArgs>(args: SelectSubset<T, SolicitudReposicionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SolicitudReposicions and returns the data updated in the database.
     * @param {SolicitudReposicionUpdateManyAndReturnArgs} args - Arguments to update many SolicitudReposicions.
     * @example
     * // Update many SolicitudReposicions
     * const solicitudReposicion = await prisma.solicitudReposicion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SolicitudReposicions and only return the `id`
     * const solicitudReposicionWithIdOnly = await prisma.solicitudReposicion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SolicitudReposicionUpdateManyAndReturnArgs>(args: SelectSubset<T, SolicitudReposicionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SolicitudReposicion.
     * @param {SolicitudReposicionUpsertArgs} args - Arguments to update or create a SolicitudReposicion.
     * @example
     * // Update or create a SolicitudReposicion
     * const solicitudReposicion = await prisma.solicitudReposicion.upsert({
     *   create: {
     *     // ... data to create a SolicitudReposicion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SolicitudReposicion we want to update
     *   }
     * })
     */
    upsert<T extends SolicitudReposicionUpsertArgs>(args: SelectSubset<T, SolicitudReposicionUpsertArgs<ExtArgs>>): Prisma__SolicitudReposicionClient<$Result.GetResult<Prisma.$SolicitudReposicionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SolicitudReposicions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudReposicionCountArgs} args - Arguments to filter SolicitudReposicions to count.
     * @example
     * // Count the number of SolicitudReposicions
     * const count = await prisma.solicitudReposicion.count({
     *   where: {
     *     // ... the filter for the SolicitudReposicions we want to count
     *   }
     * })
    **/
    count<T extends SolicitudReposicionCountArgs>(
      args?: Subset<T, SolicitudReposicionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SolicitudReposicionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SolicitudReposicion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudReposicionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SolicitudReposicionAggregateArgs>(args: Subset<T, SolicitudReposicionAggregateArgs>): Prisma.PrismaPromise<GetSolicitudReposicionAggregateType<T>>

    /**
     * Group by SolicitudReposicion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudReposicionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SolicitudReposicionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SolicitudReposicionGroupByArgs['orderBy'] }
        : { orderBy?: SolicitudReposicionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SolicitudReposicionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitudReposicionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SolicitudReposicion model
   */
  readonly fields: SolicitudReposicionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SolicitudReposicion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SolicitudReposicionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    proveedor<T extends SolicitudReposicion$proveedorArgs<ExtArgs> = {}>(args?: Subset<T, SolicitudReposicion$proveedorArgs<ExtArgs>>): Prisma__ProveedorClient<$Result.GetResult<Prisma.$ProveedorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SolicitudReposicion model
   */
  interface SolicitudReposicionFieldRefs {
    readonly id: FieldRef<"SolicitudReposicion", 'Int'>
    readonly productoId: FieldRef<"SolicitudReposicion", 'Int'>
    readonly cantidadActual: FieldRef<"SolicitudReposicion", 'Int'>
    readonly cantidadSolicitada: FieldRef<"SolicitudReposicion", 'Int'>
    readonly estado: FieldRef<"SolicitudReposicion", 'String'>
    readonly usuarioId: FieldRef<"SolicitudReposicion", 'Int'>
    readonly proveedorId: FieldRef<"SolicitudReposicion", 'Int'>
    readonly fechaEstimada: FieldRef<"SolicitudReposicion", 'DateTime'>
    readonly notaRechazo: FieldRef<"SolicitudReposicion", 'String'>
    readonly creadoEn: FieldRef<"SolicitudReposicion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SolicitudReposicion findUnique
   */
  export type SolicitudReposicionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    /**
     * Filter, which SolicitudReposicion to fetch.
     */
    where: SolicitudReposicionWhereUniqueInput
  }

  /**
   * SolicitudReposicion findUniqueOrThrow
   */
  export type SolicitudReposicionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    /**
     * Filter, which SolicitudReposicion to fetch.
     */
    where: SolicitudReposicionWhereUniqueInput
  }

  /**
   * SolicitudReposicion findFirst
   */
  export type SolicitudReposicionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    /**
     * Filter, which SolicitudReposicion to fetch.
     */
    where?: SolicitudReposicionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SolicitudReposicions to fetch.
     */
    orderBy?: SolicitudReposicionOrderByWithRelationInput | SolicitudReposicionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SolicitudReposicions.
     */
    cursor?: SolicitudReposicionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SolicitudReposicions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SolicitudReposicions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SolicitudReposicions.
     */
    distinct?: SolicitudReposicionScalarFieldEnum | SolicitudReposicionScalarFieldEnum[]
  }

  /**
   * SolicitudReposicion findFirstOrThrow
   */
  export type SolicitudReposicionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    /**
     * Filter, which SolicitudReposicion to fetch.
     */
    where?: SolicitudReposicionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SolicitudReposicions to fetch.
     */
    orderBy?: SolicitudReposicionOrderByWithRelationInput | SolicitudReposicionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SolicitudReposicions.
     */
    cursor?: SolicitudReposicionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SolicitudReposicions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SolicitudReposicions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SolicitudReposicions.
     */
    distinct?: SolicitudReposicionScalarFieldEnum | SolicitudReposicionScalarFieldEnum[]
  }

  /**
   * SolicitudReposicion findMany
   */
  export type SolicitudReposicionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    /**
     * Filter, which SolicitudReposicions to fetch.
     */
    where?: SolicitudReposicionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SolicitudReposicions to fetch.
     */
    orderBy?: SolicitudReposicionOrderByWithRelationInput | SolicitudReposicionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SolicitudReposicions.
     */
    cursor?: SolicitudReposicionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SolicitudReposicions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SolicitudReposicions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SolicitudReposicions.
     */
    distinct?: SolicitudReposicionScalarFieldEnum | SolicitudReposicionScalarFieldEnum[]
  }

  /**
   * SolicitudReposicion create
   */
  export type SolicitudReposicionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    /**
     * The data needed to create a SolicitudReposicion.
     */
    data: XOR<SolicitudReposicionCreateInput, SolicitudReposicionUncheckedCreateInput>
  }

  /**
   * SolicitudReposicion createMany
   */
  export type SolicitudReposicionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SolicitudReposicions.
     */
    data: SolicitudReposicionCreateManyInput | SolicitudReposicionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SolicitudReposicion createManyAndReturn
   */
  export type SolicitudReposicionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * The data used to create many SolicitudReposicions.
     */
    data: SolicitudReposicionCreateManyInput | SolicitudReposicionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SolicitudReposicion update
   */
  export type SolicitudReposicionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    /**
     * The data needed to update a SolicitudReposicion.
     */
    data: XOR<SolicitudReposicionUpdateInput, SolicitudReposicionUncheckedUpdateInput>
    /**
     * Choose, which SolicitudReposicion to update.
     */
    where: SolicitudReposicionWhereUniqueInput
  }

  /**
   * SolicitudReposicion updateMany
   */
  export type SolicitudReposicionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SolicitudReposicions.
     */
    data: XOR<SolicitudReposicionUpdateManyMutationInput, SolicitudReposicionUncheckedUpdateManyInput>
    /**
     * Filter which SolicitudReposicions to update
     */
    where?: SolicitudReposicionWhereInput
    /**
     * Limit how many SolicitudReposicions to update.
     */
    limit?: number
  }

  /**
   * SolicitudReposicion updateManyAndReturn
   */
  export type SolicitudReposicionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * The data used to update SolicitudReposicions.
     */
    data: XOR<SolicitudReposicionUpdateManyMutationInput, SolicitudReposicionUncheckedUpdateManyInput>
    /**
     * Filter which SolicitudReposicions to update
     */
    where?: SolicitudReposicionWhereInput
    /**
     * Limit how many SolicitudReposicions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SolicitudReposicion upsert
   */
  export type SolicitudReposicionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    /**
     * The filter to search for the SolicitudReposicion to update in case it exists.
     */
    where: SolicitudReposicionWhereUniqueInput
    /**
     * In case the SolicitudReposicion found by the `where` argument doesn't exist, create a new SolicitudReposicion with this data.
     */
    create: XOR<SolicitudReposicionCreateInput, SolicitudReposicionUncheckedCreateInput>
    /**
     * In case the SolicitudReposicion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SolicitudReposicionUpdateInput, SolicitudReposicionUncheckedUpdateInput>
  }

  /**
   * SolicitudReposicion delete
   */
  export type SolicitudReposicionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
    /**
     * Filter which SolicitudReposicion to delete.
     */
    where: SolicitudReposicionWhereUniqueInput
  }

  /**
   * SolicitudReposicion deleteMany
   */
  export type SolicitudReposicionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SolicitudReposicions to delete
     */
    where?: SolicitudReposicionWhereInput
    /**
     * Limit how many SolicitudReposicions to delete.
     */
    limit?: number
  }

  /**
   * SolicitudReposicion.proveedor
   */
  export type SolicitudReposicion$proveedorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proveedor
     */
    select?: ProveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proveedor
     */
    omit?: ProveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProveedorInclude<ExtArgs> | null
    where?: ProveedorWhereInput
  }

  /**
   * SolicitudReposicion without action
   */
  export type SolicitudReposicionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SolicitudReposicion
     */
    select?: SolicitudReposicionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SolicitudReposicion
     */
    omit?: SolicitudReposicionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudReposicionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    passwordHash: 'passwordHash',
    rol: 'rol',
    activo: 'activo',
    resetCode: 'resetCode',
    resetExpiry: 'resetExpiry',
    creadoEn: 'creadoEn'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const LogAccesoScalarFieldEnum: {
    id: 'id',
    usuarioId: 'usuarioId',
    rol: 'rol',
    timestamp: 'timestamp',
    archivado: 'archivado'
  };

  export type LogAccesoScalarFieldEnum = (typeof LogAccesoScalarFieldEnum)[keyof typeof LogAccesoScalarFieldEnum]


  export const CategoriaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre'
  };

  export type CategoriaScalarFieldEnum = (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum]


  export const ProductoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    marca: 'marca',
    precio: 'precio',
    stock: 'stock',
    fechaVencimiento: 'fechaVencimiento',
    activo: 'activo',
    categoriaId: 'categoriaId',
    creadoEn: 'creadoEn'
  };

  export type ProductoScalarFieldEnum = (typeof ProductoScalarFieldEnum)[keyof typeof ProductoScalarFieldEnum]


  export const ProveedorScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    ruc: 'ruc',
    contacto: 'contacto',
    activo: 'activo',
    creadoEn: 'creadoEn'
  };

  export type ProveedorScalarFieldEnum = (typeof ProveedorScalarFieldEnum)[keyof typeof ProveedorScalarFieldEnum]


  export const ConfigSistemaScalarFieldEnum: {
    clave: 'clave',
    valor: 'valor'
  };

  export type ConfigSistemaScalarFieldEnum = (typeof ConfigSistemaScalarFieldEnum)[keyof typeof ConfigSistemaScalarFieldEnum]


  export const ClienteScalarFieldEnum: {
    id: 'id',
    dni: 'dni',
    nombre: 'nombre',
    email: 'email',
    telefono: 'telefono',
    activo: 'activo',
    creadoEn: 'creadoEn'
  };

  export type ClienteScalarFieldEnum = (typeof ClienteScalarFieldEnum)[keyof typeof ClienteScalarFieldEnum]


  export const VentaScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    usuarioId: 'usuarioId',
    clienteId: 'clienteId',
    subtotal: 'subtotal',
    igv: 'igv',
    total: 'total',
    metodoPago: 'metodoPago',
    montoRecibido: 'montoRecibido',
    vuelto: 'vuelto',
    estado: 'estado',
    creadoEn: 'creadoEn'
  };

  export type VentaScalarFieldEnum = (typeof VentaScalarFieldEnum)[keyof typeof VentaScalarFieldEnum]


  export const DetalleVentaScalarFieldEnum: {
    id: 'id',
    ventaId: 'ventaId',
    productoId: 'productoId',
    cantidad: 'cantidad',
    precioUnitario: 'precioUnitario',
    subtotal: 'subtotal'
  };

  export type DetalleVentaScalarFieldEnum = (typeof DetalleVentaScalarFieldEnum)[keyof typeof DetalleVentaScalarFieldEnum]


  export const EntradaMercaderiaScalarFieldEnum: {
    id: 'id',
    productoId: 'productoId',
    proveedorId: 'proveedorId',
    cantidad: 'cantidad',
    precioUnitario: 'precioUnitario',
    usuarioId: 'usuarioId',
    creadoEn: 'creadoEn'
  };

  export type EntradaMercaderiaScalarFieldEnum = (typeof EntradaMercaderiaScalarFieldEnum)[keyof typeof EntradaMercaderiaScalarFieldEnum]


  export const BajaInventarioScalarFieldEnum: {
    id: 'id',
    productoId: 'productoId',
    cantidad: 'cantidad',
    motivo: 'motivo',
    usuarioId: 'usuarioId',
    creadoEn: 'creadoEn'
  };

  export type BajaInventarioScalarFieldEnum = (typeof BajaInventarioScalarFieldEnum)[keyof typeof BajaInventarioScalarFieldEnum]


  export const SolicitudReposicionScalarFieldEnum: {
    id: 'id',
    productoId: 'productoId',
    cantidadActual: 'cantidadActual',
    cantidadSolicitada: 'cantidadSolicitada',
    estado: 'estado',
    usuarioId: 'usuarioId',
    proveedorId: 'proveedorId',
    fechaEstimada: 'fechaEstimada',
    notaRechazo: 'notaRechazo',
    creadoEn: 'creadoEn'
  };

  export type SolicitudReposicionScalarFieldEnum = (typeof SolicitudReposicionScalarFieldEnum)[keyof typeof SolicitudReposicionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nombre?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    passwordHash?: StringFilter<"Usuario"> | string
    rol?: StringFilter<"Usuario"> | string
    activo?: BoolFilter<"Usuario"> | boolean
    resetCode?: StringNullableFilter<"Usuario"> | string | null
    resetExpiry?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    creadoEn?: DateTimeFilter<"Usuario"> | Date | string
    logAccesos?: LogAccesoListRelationFilter
    ventas?: VentaListRelationFilter
    entradasMercaderia?: EntradaMercaderiaListRelationFilter
    bajas?: BajaInventarioListRelationFilter
    solicitudes?: SolicitudReposicionListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    resetCode?: SortOrderInput | SortOrder
    resetExpiry?: SortOrderInput | SortOrder
    creadoEn?: SortOrder
    logAccesos?: LogAccesoOrderByRelationAggregateInput
    ventas?: VentaOrderByRelationAggregateInput
    entradasMercaderia?: EntradaMercaderiaOrderByRelationAggregateInput
    bajas?: BajaInventarioOrderByRelationAggregateInput
    solicitudes?: SolicitudReposicionOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    passwordHash?: StringFilter<"Usuario"> | string
    rol?: StringFilter<"Usuario"> | string
    activo?: BoolFilter<"Usuario"> | boolean
    resetCode?: StringNullableFilter<"Usuario"> | string | null
    resetExpiry?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    creadoEn?: DateTimeFilter<"Usuario"> | Date | string
    logAccesos?: LogAccesoListRelationFilter
    ventas?: VentaListRelationFilter
    entradasMercaderia?: EntradaMercaderiaListRelationFilter
    bajas?: BajaInventarioListRelationFilter
    solicitudes?: SolicitudReposicionListRelationFilter
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    resetCode?: SortOrderInput | SortOrder
    resetExpiry?: SortOrderInput | SortOrder
    creadoEn?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    passwordHash?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: StringWithAggregatesFilter<"Usuario"> | string
    activo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    resetCode?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    resetExpiry?: DateTimeNullableWithAggregatesFilter<"Usuario"> | Date | string | null
    creadoEn?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type LogAccesoWhereInput = {
    AND?: LogAccesoWhereInput | LogAccesoWhereInput[]
    OR?: LogAccesoWhereInput[]
    NOT?: LogAccesoWhereInput | LogAccesoWhereInput[]
    id?: IntFilter<"LogAcceso"> | number
    usuarioId?: IntFilter<"LogAcceso"> | number
    rol?: StringFilter<"LogAcceso"> | string
    timestamp?: DateTimeFilter<"LogAcceso"> | Date | string
    archivado?: BoolFilter<"LogAcceso"> | boolean
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type LogAccesoOrderByWithRelationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    rol?: SortOrder
    timestamp?: SortOrder
    archivado?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type LogAccesoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LogAccesoWhereInput | LogAccesoWhereInput[]
    OR?: LogAccesoWhereInput[]
    NOT?: LogAccesoWhereInput | LogAccesoWhereInput[]
    usuarioId?: IntFilter<"LogAcceso"> | number
    rol?: StringFilter<"LogAcceso"> | string
    timestamp?: DateTimeFilter<"LogAcceso"> | Date | string
    archivado?: BoolFilter<"LogAcceso"> | boolean
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type LogAccesoOrderByWithAggregationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    rol?: SortOrder
    timestamp?: SortOrder
    archivado?: SortOrder
    _count?: LogAccesoCountOrderByAggregateInput
    _avg?: LogAccesoAvgOrderByAggregateInput
    _max?: LogAccesoMaxOrderByAggregateInput
    _min?: LogAccesoMinOrderByAggregateInput
    _sum?: LogAccesoSumOrderByAggregateInput
  }

  export type LogAccesoScalarWhereWithAggregatesInput = {
    AND?: LogAccesoScalarWhereWithAggregatesInput | LogAccesoScalarWhereWithAggregatesInput[]
    OR?: LogAccesoScalarWhereWithAggregatesInput[]
    NOT?: LogAccesoScalarWhereWithAggregatesInput | LogAccesoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LogAcceso"> | number
    usuarioId?: IntWithAggregatesFilter<"LogAcceso"> | number
    rol?: StringWithAggregatesFilter<"LogAcceso"> | string
    timestamp?: DateTimeWithAggregatesFilter<"LogAcceso"> | Date | string
    archivado?: BoolWithAggregatesFilter<"LogAcceso"> | boolean
  }

  export type CategoriaWhereInput = {
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    id?: IntFilter<"Categoria"> | number
    nombre?: StringFilter<"Categoria"> | string
    productos?: ProductoListRelationFilter
  }

  export type CategoriaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    productos?: ProductoOrderByRelationAggregateInput
  }

  export type CategoriaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    productos?: ProductoListRelationFilter
  }, "id" | "nombre">

  export type CategoriaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    _count?: CategoriaCountOrderByAggregateInput
    _avg?: CategoriaAvgOrderByAggregateInput
    _max?: CategoriaMaxOrderByAggregateInput
    _min?: CategoriaMinOrderByAggregateInput
    _sum?: CategoriaSumOrderByAggregateInput
  }

  export type CategoriaScalarWhereWithAggregatesInput = {
    AND?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    OR?: CategoriaScalarWhereWithAggregatesInput[]
    NOT?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Categoria"> | number
    nombre?: StringWithAggregatesFilter<"Categoria"> | string
  }

  export type ProductoWhereInput = {
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    id?: IntFilter<"Producto"> | number
    nombre?: StringFilter<"Producto"> | string
    marca?: StringFilter<"Producto"> | string
    precio?: DecimalFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Producto"> | number
    fechaVencimiento?: DateTimeNullableFilter<"Producto"> | Date | string | null
    activo?: BoolFilter<"Producto"> | boolean
    categoriaId?: IntFilter<"Producto"> | number
    creadoEn?: DateTimeFilter<"Producto"> | Date | string
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    detallesVenta?: DetalleVentaListRelationFilter
    entradasMercaderia?: EntradaMercaderiaListRelationFilter
    bajas?: BajaInventarioListRelationFilter
    solicitudes?: SolicitudReposicionListRelationFilter
  }

  export type ProductoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    marca?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    fechaVencimiento?: SortOrderInput | SortOrder
    activo?: SortOrder
    categoriaId?: SortOrder
    creadoEn?: SortOrder
    categoria?: CategoriaOrderByWithRelationInput
    detallesVenta?: DetalleVentaOrderByRelationAggregateInput
    entradasMercaderia?: EntradaMercaderiaOrderByRelationAggregateInput
    bajas?: BajaInventarioOrderByRelationAggregateInput
    solicitudes?: SolicitudReposicionOrderByRelationAggregateInput
  }

  export type ProductoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre_activo?: ProductoNombreActivoCompoundUniqueInput
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    nombre?: StringFilter<"Producto"> | string
    marca?: StringFilter<"Producto"> | string
    precio?: DecimalFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Producto"> | number
    fechaVencimiento?: DateTimeNullableFilter<"Producto"> | Date | string | null
    activo?: BoolFilter<"Producto"> | boolean
    categoriaId?: IntFilter<"Producto"> | number
    creadoEn?: DateTimeFilter<"Producto"> | Date | string
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    detallesVenta?: DetalleVentaListRelationFilter
    entradasMercaderia?: EntradaMercaderiaListRelationFilter
    bajas?: BajaInventarioListRelationFilter
    solicitudes?: SolicitudReposicionListRelationFilter
  }, "id" | "nombre_activo">

  export type ProductoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    marca?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    fechaVencimiento?: SortOrderInput | SortOrder
    activo?: SortOrder
    categoriaId?: SortOrder
    creadoEn?: SortOrder
    _count?: ProductoCountOrderByAggregateInput
    _avg?: ProductoAvgOrderByAggregateInput
    _max?: ProductoMaxOrderByAggregateInput
    _min?: ProductoMinOrderByAggregateInput
    _sum?: ProductoSumOrderByAggregateInput
  }

  export type ProductoScalarWhereWithAggregatesInput = {
    AND?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    OR?: ProductoScalarWhereWithAggregatesInput[]
    NOT?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Producto"> | number
    nombre?: StringWithAggregatesFilter<"Producto"> | string
    marca?: StringWithAggregatesFilter<"Producto"> | string
    precio?: DecimalWithAggregatesFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    stock?: IntWithAggregatesFilter<"Producto"> | number
    fechaVencimiento?: DateTimeNullableWithAggregatesFilter<"Producto"> | Date | string | null
    activo?: BoolWithAggregatesFilter<"Producto"> | boolean
    categoriaId?: IntWithAggregatesFilter<"Producto"> | number
    creadoEn?: DateTimeWithAggregatesFilter<"Producto"> | Date | string
  }

  export type ProveedorWhereInput = {
    AND?: ProveedorWhereInput | ProveedorWhereInput[]
    OR?: ProveedorWhereInput[]
    NOT?: ProveedorWhereInput | ProveedorWhereInput[]
    id?: IntFilter<"Proveedor"> | number
    nombre?: StringFilter<"Proveedor"> | string
    ruc?: StringFilter<"Proveedor"> | string
    contacto?: StringFilter<"Proveedor"> | string
    activo?: BoolFilter<"Proveedor"> | boolean
    creadoEn?: DateTimeFilter<"Proveedor"> | Date | string
    entradasMercaderia?: EntradaMercaderiaListRelationFilter
    solicitudes?: SolicitudReposicionListRelationFilter
  }

  export type ProveedorOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    contacto?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
    entradasMercaderia?: EntradaMercaderiaOrderByRelationAggregateInput
    solicitudes?: SolicitudReposicionOrderByRelationAggregateInput
  }

  export type ProveedorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    ruc?: string
    AND?: ProveedorWhereInput | ProveedorWhereInput[]
    OR?: ProveedorWhereInput[]
    NOT?: ProveedorWhereInput | ProveedorWhereInput[]
    nombre?: StringFilter<"Proveedor"> | string
    contacto?: StringFilter<"Proveedor"> | string
    activo?: BoolFilter<"Proveedor"> | boolean
    creadoEn?: DateTimeFilter<"Proveedor"> | Date | string
    entradasMercaderia?: EntradaMercaderiaListRelationFilter
    solicitudes?: SolicitudReposicionListRelationFilter
  }, "id" | "ruc">

  export type ProveedorOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    contacto?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
    _count?: ProveedorCountOrderByAggregateInput
    _avg?: ProveedorAvgOrderByAggregateInput
    _max?: ProveedorMaxOrderByAggregateInput
    _min?: ProveedorMinOrderByAggregateInput
    _sum?: ProveedorSumOrderByAggregateInput
  }

  export type ProveedorScalarWhereWithAggregatesInput = {
    AND?: ProveedorScalarWhereWithAggregatesInput | ProveedorScalarWhereWithAggregatesInput[]
    OR?: ProveedorScalarWhereWithAggregatesInput[]
    NOT?: ProveedorScalarWhereWithAggregatesInput | ProveedorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Proveedor"> | number
    nombre?: StringWithAggregatesFilter<"Proveedor"> | string
    ruc?: StringWithAggregatesFilter<"Proveedor"> | string
    contacto?: StringWithAggregatesFilter<"Proveedor"> | string
    activo?: BoolWithAggregatesFilter<"Proveedor"> | boolean
    creadoEn?: DateTimeWithAggregatesFilter<"Proveedor"> | Date | string
  }

  export type ConfigSistemaWhereInput = {
    AND?: ConfigSistemaWhereInput | ConfigSistemaWhereInput[]
    OR?: ConfigSistemaWhereInput[]
    NOT?: ConfigSistemaWhereInput | ConfigSistemaWhereInput[]
    clave?: StringFilter<"ConfigSistema"> | string
    valor?: StringFilter<"ConfigSistema"> | string
  }

  export type ConfigSistemaOrderByWithRelationInput = {
    clave?: SortOrder
    valor?: SortOrder
  }

  export type ConfigSistemaWhereUniqueInput = Prisma.AtLeast<{
    clave?: string
    AND?: ConfigSistemaWhereInput | ConfigSistemaWhereInput[]
    OR?: ConfigSistemaWhereInput[]
    NOT?: ConfigSistemaWhereInput | ConfigSistemaWhereInput[]
    valor?: StringFilter<"ConfigSistema"> | string
  }, "clave">

  export type ConfigSistemaOrderByWithAggregationInput = {
    clave?: SortOrder
    valor?: SortOrder
    _count?: ConfigSistemaCountOrderByAggregateInput
    _max?: ConfigSistemaMaxOrderByAggregateInput
    _min?: ConfigSistemaMinOrderByAggregateInput
  }

  export type ConfigSistemaScalarWhereWithAggregatesInput = {
    AND?: ConfigSistemaScalarWhereWithAggregatesInput | ConfigSistemaScalarWhereWithAggregatesInput[]
    OR?: ConfigSistemaScalarWhereWithAggregatesInput[]
    NOT?: ConfigSistemaScalarWhereWithAggregatesInput | ConfigSistemaScalarWhereWithAggregatesInput[]
    clave?: StringWithAggregatesFilter<"ConfigSistema"> | string
    valor?: StringWithAggregatesFilter<"ConfigSistema"> | string
  }

  export type ClienteWhereInput = {
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    id?: IntFilter<"Cliente"> | number
    dni?: StringFilter<"Cliente"> | string
    nombre?: StringFilter<"Cliente"> | string
    email?: StringNullableFilter<"Cliente"> | string | null
    telefono?: StringNullableFilter<"Cliente"> | string | null
    activo?: BoolFilter<"Cliente"> | boolean
    creadoEn?: DateTimeFilter<"Cliente"> | Date | string
    ventas?: VentaListRelationFilter
  }

  export type ClienteOrderByWithRelationInput = {
    id?: SortOrder
    dni?: SortOrder
    nombre?: SortOrder
    email?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
    ventas?: VentaOrderByRelationAggregateInput
  }

  export type ClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    dni?: string
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    nombre?: StringFilter<"Cliente"> | string
    email?: StringNullableFilter<"Cliente"> | string | null
    telefono?: StringNullableFilter<"Cliente"> | string | null
    activo?: BoolFilter<"Cliente"> | boolean
    creadoEn?: DateTimeFilter<"Cliente"> | Date | string
    ventas?: VentaListRelationFilter
  }, "id" | "dni">

  export type ClienteOrderByWithAggregationInput = {
    id?: SortOrder
    dni?: SortOrder
    nombre?: SortOrder
    email?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
    _count?: ClienteCountOrderByAggregateInput
    _avg?: ClienteAvgOrderByAggregateInput
    _max?: ClienteMaxOrderByAggregateInput
    _min?: ClienteMinOrderByAggregateInput
    _sum?: ClienteSumOrderByAggregateInput
  }

  export type ClienteScalarWhereWithAggregatesInput = {
    AND?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    OR?: ClienteScalarWhereWithAggregatesInput[]
    NOT?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Cliente"> | number
    dni?: StringWithAggregatesFilter<"Cliente"> | string
    nombre?: StringWithAggregatesFilter<"Cliente"> | string
    email?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    activo?: BoolWithAggregatesFilter<"Cliente"> | boolean
    creadoEn?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
  }

  export type VentaWhereInput = {
    AND?: VentaWhereInput | VentaWhereInput[]
    OR?: VentaWhereInput[]
    NOT?: VentaWhereInput | VentaWhereInput[]
    id?: IntFilter<"Venta"> | number
    numero?: StringFilter<"Venta"> | string
    usuarioId?: IntFilter<"Venta"> | number
    clienteId?: IntNullableFilter<"Venta"> | number | null
    subtotal?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    igv?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFilter<"Venta"> | string
    montoRecibido?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    estado?: StringFilter<"Venta"> | string
    creadoEn?: DateTimeFilter<"Venta"> | Date | string
    detalles?: DetalleVentaListRelationFilter
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    cliente?: XOR<ClienteNullableScalarRelationFilter, ClienteWhereInput> | null
  }

  export type VentaOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    usuarioId?: SortOrder
    clienteId?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    igv?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    montoRecibido?: SortOrder
    vuelto?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
    detalles?: DetalleVentaOrderByRelationAggregateInput
    usuario?: UsuarioOrderByWithRelationInput
    cliente?: ClienteOrderByWithRelationInput
  }

  export type VentaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    numero?: string
    AND?: VentaWhereInput | VentaWhereInput[]
    OR?: VentaWhereInput[]
    NOT?: VentaWhereInput | VentaWhereInput[]
    usuarioId?: IntFilter<"Venta"> | number
    clienteId?: IntNullableFilter<"Venta"> | number | null
    subtotal?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    igv?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFilter<"Venta"> | string
    montoRecibido?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    estado?: StringFilter<"Venta"> | string
    creadoEn?: DateTimeFilter<"Venta"> | Date | string
    detalles?: DetalleVentaListRelationFilter
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    cliente?: XOR<ClienteNullableScalarRelationFilter, ClienteWhereInput> | null
  }, "id" | "numero">

  export type VentaOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    usuarioId?: SortOrder
    clienteId?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    igv?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    montoRecibido?: SortOrder
    vuelto?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
    _count?: VentaCountOrderByAggregateInput
    _avg?: VentaAvgOrderByAggregateInput
    _max?: VentaMaxOrderByAggregateInput
    _min?: VentaMinOrderByAggregateInput
    _sum?: VentaSumOrderByAggregateInput
  }

  export type VentaScalarWhereWithAggregatesInput = {
    AND?: VentaScalarWhereWithAggregatesInput | VentaScalarWhereWithAggregatesInput[]
    OR?: VentaScalarWhereWithAggregatesInput[]
    NOT?: VentaScalarWhereWithAggregatesInput | VentaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Venta"> | number
    numero?: StringWithAggregatesFilter<"Venta"> | string
    usuarioId?: IntWithAggregatesFilter<"Venta"> | number
    clienteId?: IntNullableWithAggregatesFilter<"Venta"> | number | null
    subtotal?: DecimalWithAggregatesFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    igv?: DecimalWithAggregatesFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    total?: DecimalWithAggregatesFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    metodoPago?: StringWithAggregatesFilter<"Venta"> | string
    montoRecibido?: DecimalWithAggregatesFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalWithAggregatesFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    estado?: StringWithAggregatesFilter<"Venta"> | string
    creadoEn?: DateTimeWithAggregatesFilter<"Venta"> | Date | string
  }

  export type DetalleVentaWhereInput = {
    AND?: DetalleVentaWhereInput | DetalleVentaWhereInput[]
    OR?: DetalleVentaWhereInput[]
    NOT?: DetalleVentaWhereInput | DetalleVentaWhereInput[]
    id?: IntFilter<"DetalleVenta"> | number
    ventaId?: IntFilter<"DetalleVenta"> | number
    productoId?: IntFilter<"DetalleVenta"> | number
    cantidad?: IntFilter<"DetalleVenta"> | number
    precioUnitario?: DecimalFilter<"DetalleVenta"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"DetalleVenta"> | Decimal | DecimalJsLike | number | string
    venta?: XOR<VentaScalarRelationFilter, VentaWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }

  export type DetalleVentaOrderByWithRelationInput = {
    id?: SortOrder
    ventaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    venta?: VentaOrderByWithRelationInput
    producto?: ProductoOrderByWithRelationInput
  }

  export type DetalleVentaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DetalleVentaWhereInput | DetalleVentaWhereInput[]
    OR?: DetalleVentaWhereInput[]
    NOT?: DetalleVentaWhereInput | DetalleVentaWhereInput[]
    ventaId?: IntFilter<"DetalleVenta"> | number
    productoId?: IntFilter<"DetalleVenta"> | number
    cantidad?: IntFilter<"DetalleVenta"> | number
    precioUnitario?: DecimalFilter<"DetalleVenta"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"DetalleVenta"> | Decimal | DecimalJsLike | number | string
    venta?: XOR<VentaScalarRelationFilter, VentaWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }, "id">

  export type DetalleVentaOrderByWithAggregationInput = {
    id?: SortOrder
    ventaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
    _count?: DetalleVentaCountOrderByAggregateInput
    _avg?: DetalleVentaAvgOrderByAggregateInput
    _max?: DetalleVentaMaxOrderByAggregateInput
    _min?: DetalleVentaMinOrderByAggregateInput
    _sum?: DetalleVentaSumOrderByAggregateInput
  }

  export type DetalleVentaScalarWhereWithAggregatesInput = {
    AND?: DetalleVentaScalarWhereWithAggregatesInput | DetalleVentaScalarWhereWithAggregatesInput[]
    OR?: DetalleVentaScalarWhereWithAggregatesInput[]
    NOT?: DetalleVentaScalarWhereWithAggregatesInput | DetalleVentaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DetalleVenta"> | number
    ventaId?: IntWithAggregatesFilter<"DetalleVenta"> | number
    productoId?: IntWithAggregatesFilter<"DetalleVenta"> | number
    cantidad?: IntWithAggregatesFilter<"DetalleVenta"> | number
    precioUnitario?: DecimalWithAggregatesFilter<"DetalleVenta"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalWithAggregatesFilter<"DetalleVenta"> | Decimal | DecimalJsLike | number | string
  }

  export type EntradaMercaderiaWhereInput = {
    AND?: EntradaMercaderiaWhereInput | EntradaMercaderiaWhereInput[]
    OR?: EntradaMercaderiaWhereInput[]
    NOT?: EntradaMercaderiaWhereInput | EntradaMercaderiaWhereInput[]
    id?: IntFilter<"EntradaMercaderia"> | number
    productoId?: IntFilter<"EntradaMercaderia"> | number
    proveedorId?: IntFilter<"EntradaMercaderia"> | number
    cantidad?: IntFilter<"EntradaMercaderia"> | number
    precioUnitario?: DecimalFilter<"EntradaMercaderia"> | Decimal | DecimalJsLike | number | string
    usuarioId?: IntFilter<"EntradaMercaderia"> | number
    creadoEn?: DateTimeFilter<"EntradaMercaderia"> | Date | string
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    proveedor?: XOR<ProveedorScalarRelationFilter, ProveedorWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type EntradaMercaderiaOrderByWithRelationInput = {
    id?: SortOrder
    productoId?: SortOrder
    proveedorId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
    producto?: ProductoOrderByWithRelationInput
    proveedor?: ProveedorOrderByWithRelationInput
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type EntradaMercaderiaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EntradaMercaderiaWhereInput | EntradaMercaderiaWhereInput[]
    OR?: EntradaMercaderiaWhereInput[]
    NOT?: EntradaMercaderiaWhereInput | EntradaMercaderiaWhereInput[]
    productoId?: IntFilter<"EntradaMercaderia"> | number
    proveedorId?: IntFilter<"EntradaMercaderia"> | number
    cantidad?: IntFilter<"EntradaMercaderia"> | number
    precioUnitario?: DecimalFilter<"EntradaMercaderia"> | Decimal | DecimalJsLike | number | string
    usuarioId?: IntFilter<"EntradaMercaderia"> | number
    creadoEn?: DateTimeFilter<"EntradaMercaderia"> | Date | string
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    proveedor?: XOR<ProveedorScalarRelationFilter, ProveedorWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type EntradaMercaderiaOrderByWithAggregationInput = {
    id?: SortOrder
    productoId?: SortOrder
    proveedorId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
    _count?: EntradaMercaderiaCountOrderByAggregateInput
    _avg?: EntradaMercaderiaAvgOrderByAggregateInput
    _max?: EntradaMercaderiaMaxOrderByAggregateInput
    _min?: EntradaMercaderiaMinOrderByAggregateInput
    _sum?: EntradaMercaderiaSumOrderByAggregateInput
  }

  export type EntradaMercaderiaScalarWhereWithAggregatesInput = {
    AND?: EntradaMercaderiaScalarWhereWithAggregatesInput | EntradaMercaderiaScalarWhereWithAggregatesInput[]
    OR?: EntradaMercaderiaScalarWhereWithAggregatesInput[]
    NOT?: EntradaMercaderiaScalarWhereWithAggregatesInput | EntradaMercaderiaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EntradaMercaderia"> | number
    productoId?: IntWithAggregatesFilter<"EntradaMercaderia"> | number
    proveedorId?: IntWithAggregatesFilter<"EntradaMercaderia"> | number
    cantidad?: IntWithAggregatesFilter<"EntradaMercaderia"> | number
    precioUnitario?: DecimalWithAggregatesFilter<"EntradaMercaderia"> | Decimal | DecimalJsLike | number | string
    usuarioId?: IntWithAggregatesFilter<"EntradaMercaderia"> | number
    creadoEn?: DateTimeWithAggregatesFilter<"EntradaMercaderia"> | Date | string
  }

  export type BajaInventarioWhereInput = {
    AND?: BajaInventarioWhereInput | BajaInventarioWhereInput[]
    OR?: BajaInventarioWhereInput[]
    NOT?: BajaInventarioWhereInput | BajaInventarioWhereInput[]
    id?: IntFilter<"BajaInventario"> | number
    productoId?: IntFilter<"BajaInventario"> | number
    cantidad?: IntFilter<"BajaInventario"> | number
    motivo?: StringFilter<"BajaInventario"> | string
    usuarioId?: IntFilter<"BajaInventario"> | number
    creadoEn?: DateTimeFilter<"BajaInventario"> | Date | string
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type BajaInventarioOrderByWithRelationInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    motivo?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
    producto?: ProductoOrderByWithRelationInput
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type BajaInventarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BajaInventarioWhereInput | BajaInventarioWhereInput[]
    OR?: BajaInventarioWhereInput[]
    NOT?: BajaInventarioWhereInput | BajaInventarioWhereInput[]
    productoId?: IntFilter<"BajaInventario"> | number
    cantidad?: IntFilter<"BajaInventario"> | number
    motivo?: StringFilter<"BajaInventario"> | string
    usuarioId?: IntFilter<"BajaInventario"> | number
    creadoEn?: DateTimeFilter<"BajaInventario"> | Date | string
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type BajaInventarioOrderByWithAggregationInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    motivo?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
    _count?: BajaInventarioCountOrderByAggregateInput
    _avg?: BajaInventarioAvgOrderByAggregateInput
    _max?: BajaInventarioMaxOrderByAggregateInput
    _min?: BajaInventarioMinOrderByAggregateInput
    _sum?: BajaInventarioSumOrderByAggregateInput
  }

  export type BajaInventarioScalarWhereWithAggregatesInput = {
    AND?: BajaInventarioScalarWhereWithAggregatesInput | BajaInventarioScalarWhereWithAggregatesInput[]
    OR?: BajaInventarioScalarWhereWithAggregatesInput[]
    NOT?: BajaInventarioScalarWhereWithAggregatesInput | BajaInventarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BajaInventario"> | number
    productoId?: IntWithAggregatesFilter<"BajaInventario"> | number
    cantidad?: IntWithAggregatesFilter<"BajaInventario"> | number
    motivo?: StringWithAggregatesFilter<"BajaInventario"> | string
    usuarioId?: IntWithAggregatesFilter<"BajaInventario"> | number
    creadoEn?: DateTimeWithAggregatesFilter<"BajaInventario"> | Date | string
  }

  export type SolicitudReposicionWhereInput = {
    AND?: SolicitudReposicionWhereInput | SolicitudReposicionWhereInput[]
    OR?: SolicitudReposicionWhereInput[]
    NOT?: SolicitudReposicionWhereInput | SolicitudReposicionWhereInput[]
    id?: IntFilter<"SolicitudReposicion"> | number
    productoId?: IntFilter<"SolicitudReposicion"> | number
    cantidadActual?: IntFilter<"SolicitudReposicion"> | number
    cantidadSolicitada?: IntFilter<"SolicitudReposicion"> | number
    estado?: StringFilter<"SolicitudReposicion"> | string
    usuarioId?: IntFilter<"SolicitudReposicion"> | number
    proveedorId?: IntNullableFilter<"SolicitudReposicion"> | number | null
    fechaEstimada?: DateTimeNullableFilter<"SolicitudReposicion"> | Date | string | null
    notaRechazo?: StringNullableFilter<"SolicitudReposicion"> | string | null
    creadoEn?: DateTimeFilter<"SolicitudReposicion"> | Date | string
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    proveedor?: XOR<ProveedorNullableScalarRelationFilter, ProveedorWhereInput> | null
  }

  export type SolicitudReposicionOrderByWithRelationInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidadActual?: SortOrder
    cantidadSolicitada?: SortOrder
    estado?: SortOrder
    usuarioId?: SortOrder
    proveedorId?: SortOrderInput | SortOrder
    fechaEstimada?: SortOrderInput | SortOrder
    notaRechazo?: SortOrderInput | SortOrder
    creadoEn?: SortOrder
    producto?: ProductoOrderByWithRelationInput
    usuario?: UsuarioOrderByWithRelationInput
    proveedor?: ProveedorOrderByWithRelationInput
  }

  export type SolicitudReposicionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SolicitudReposicionWhereInput | SolicitudReposicionWhereInput[]
    OR?: SolicitudReposicionWhereInput[]
    NOT?: SolicitudReposicionWhereInput | SolicitudReposicionWhereInput[]
    productoId?: IntFilter<"SolicitudReposicion"> | number
    cantidadActual?: IntFilter<"SolicitudReposicion"> | number
    cantidadSolicitada?: IntFilter<"SolicitudReposicion"> | number
    estado?: StringFilter<"SolicitudReposicion"> | string
    usuarioId?: IntFilter<"SolicitudReposicion"> | number
    proveedorId?: IntNullableFilter<"SolicitudReposicion"> | number | null
    fechaEstimada?: DateTimeNullableFilter<"SolicitudReposicion"> | Date | string | null
    notaRechazo?: StringNullableFilter<"SolicitudReposicion"> | string | null
    creadoEn?: DateTimeFilter<"SolicitudReposicion"> | Date | string
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    proveedor?: XOR<ProveedorNullableScalarRelationFilter, ProveedorWhereInput> | null
  }, "id">

  export type SolicitudReposicionOrderByWithAggregationInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidadActual?: SortOrder
    cantidadSolicitada?: SortOrder
    estado?: SortOrder
    usuarioId?: SortOrder
    proveedorId?: SortOrderInput | SortOrder
    fechaEstimada?: SortOrderInput | SortOrder
    notaRechazo?: SortOrderInput | SortOrder
    creadoEn?: SortOrder
    _count?: SolicitudReposicionCountOrderByAggregateInput
    _avg?: SolicitudReposicionAvgOrderByAggregateInput
    _max?: SolicitudReposicionMaxOrderByAggregateInput
    _min?: SolicitudReposicionMinOrderByAggregateInput
    _sum?: SolicitudReposicionSumOrderByAggregateInput
  }

  export type SolicitudReposicionScalarWhereWithAggregatesInput = {
    AND?: SolicitudReposicionScalarWhereWithAggregatesInput | SolicitudReposicionScalarWhereWithAggregatesInput[]
    OR?: SolicitudReposicionScalarWhereWithAggregatesInput[]
    NOT?: SolicitudReposicionScalarWhereWithAggregatesInput | SolicitudReposicionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SolicitudReposicion"> | number
    productoId?: IntWithAggregatesFilter<"SolicitudReposicion"> | number
    cantidadActual?: IntWithAggregatesFilter<"SolicitudReposicion"> | number
    cantidadSolicitada?: IntWithAggregatesFilter<"SolicitudReposicion"> | number
    estado?: StringWithAggregatesFilter<"SolicitudReposicion"> | string
    usuarioId?: IntWithAggregatesFilter<"SolicitudReposicion"> | number
    proveedorId?: IntNullableWithAggregatesFilter<"SolicitudReposicion"> | number | null
    fechaEstimada?: DateTimeNullableWithAggregatesFilter<"SolicitudReposicion"> | Date | string | null
    notaRechazo?: StringNullableWithAggregatesFilter<"SolicitudReposicion"> | string | null
    creadoEn?: DateTimeWithAggregatesFilter<"SolicitudReposicion"> | Date | string
  }

  export type UsuarioCreateInput = {
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoCreateNestedManyWithoutUsuarioInput
    ventas?: VentaCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoUncheckedCreateNestedManyWithoutUsuarioInput
    ventas?: VentaUncheckedCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUpdateManyWithoutUsuarioNestedInput
    ventas?: VentaUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUncheckedUpdateManyWithoutUsuarioNestedInput
    ventas?: VentaUncheckedUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogAccesoCreateInput = {
    rol: string
    timestamp?: Date | string
    archivado?: boolean
    usuario: UsuarioCreateNestedOneWithoutLogAccesosInput
  }

  export type LogAccesoUncheckedCreateInput = {
    id?: number
    usuarioId: number
    rol: string
    timestamp?: Date | string
    archivado?: boolean
  }

  export type LogAccesoUpdateInput = {
    rol?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    archivado?: BoolFieldUpdateOperationsInput | boolean
    usuario?: UsuarioUpdateOneRequiredWithoutLogAccesosNestedInput
  }

  export type LogAccesoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    rol?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    archivado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LogAccesoCreateManyInput = {
    id?: number
    usuarioId: number
    rol: string
    timestamp?: Date | string
    archivado?: boolean
  }

  export type LogAccesoUpdateManyMutationInput = {
    rol?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    archivado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LogAccesoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    rol?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    archivado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoriaCreateInput = {
    nombre: string
    productos?: ProductoCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateInput = {
    id?: number
    nombre: string
    productos?: ProductoUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    productos?: ProductoUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    productos?: ProductoUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaCreateManyInput = {
    id?: number
    nombre: string
  }

  export type CategoriaUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type ProductoCreateInput = {
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    creadoEn?: Date | string
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    detallesVenta?: DetalleVentaCreateNestedManyWithoutProductoInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateInput = {
    id?: number
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    categoriaId: number
    creadoEn?: Date | string
    detallesVenta?: DetalleVentaUncheckedCreateNestedManyWithoutProductoInput
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    detallesVenta?: DetalleVentaUpdateManyWithoutProductoNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detallesVenta?: DetalleVentaUncheckedUpdateManyWithoutProductoNestedInput
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoCreateManyInput = {
    id?: number
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    categoriaId: number
    creadoEn?: Date | string
  }

  export type ProductoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProveedorCreateInput = {
    nombre: string
    ruc: string
    contacto: string
    activo?: boolean
    creadoEn?: Date | string
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutProveedorInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutProveedorInput
  }

  export type ProveedorUncheckedCreateInput = {
    id?: number
    nombre: string
    ruc: string
    contacto: string
    activo?: boolean
    creadoEn?: Date | string
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutProveedorInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutProveedorInput
  }

  export type ProveedorUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    contacto?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutProveedorNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutProveedorNestedInput
  }

  export type ProveedorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    contacto?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutProveedorNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutProveedorNestedInput
  }

  export type ProveedorCreateManyInput = {
    id?: number
    nombre: string
    ruc: string
    contacto: string
    activo?: boolean
    creadoEn?: Date | string
  }

  export type ProveedorUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    contacto?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProveedorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    contacto?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfigSistemaCreateInput = {
    clave: string
    valor: string
  }

  export type ConfigSistemaUncheckedCreateInput = {
    clave: string
    valor: string
  }

  export type ConfigSistemaUpdateInput = {
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigSistemaUncheckedUpdateInput = {
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigSistemaCreateManyInput = {
    clave: string
    valor: string
  }

  export type ConfigSistemaUpdateManyMutationInput = {
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigSistemaUncheckedUpdateManyInput = {
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type ClienteCreateInput = {
    dni: string
    nombre: string
    email?: string | null
    telefono?: string | null
    activo?: boolean
    creadoEn?: Date | string
    ventas?: VentaCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateInput = {
    id?: number
    dni: string
    nombre: string
    email?: string | null
    telefono?: string | null
    activo?: boolean
    creadoEn?: Date | string
    ventas?: VentaUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteUpdateInput = {
    dni?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    ventas?: VentaUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dni?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    ventas?: VentaUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClienteCreateManyInput = {
    id?: number
    dni: string
    nombre: string
    email?: string | null
    telefono?: string | null
    activo?: boolean
    creadoEn?: Date | string
  }

  export type ClienteUpdateManyMutationInput = {
    dni?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dni?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VentaCreateInput = {
    numero: string
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
    detalles?: DetalleVentaCreateNestedManyWithoutVentaInput
    usuario: UsuarioCreateNestedOneWithoutVentasInput
    cliente?: ClienteCreateNestedOneWithoutVentasInput
  }

  export type VentaUncheckedCreateInput = {
    id?: number
    numero: string
    usuarioId: number
    clienteId?: number | null
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
    detalles?: DetalleVentaUncheckedCreateNestedManyWithoutVentaInput
  }

  export type VentaUpdateInput = {
    numero?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleVentaUpdateManyWithoutVentaNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutVentasNestedInput
    cliente?: ClienteUpdateOneWithoutVentasNestedInput
  }

  export type VentaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    clienteId?: NullableIntFieldUpdateOperationsInput | number | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleVentaUncheckedUpdateManyWithoutVentaNestedInput
  }

  export type VentaCreateManyInput = {
    id?: number
    numero: string
    usuarioId: number
    clienteId?: number | null
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
  }

  export type VentaUpdateManyMutationInput = {
    numero?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VentaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    clienteId?: NullableIntFieldUpdateOperationsInput | number | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DetalleVentaCreateInput = {
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    venta: VentaCreateNestedOneWithoutDetallesInput
    producto: ProductoCreateNestedOneWithoutDetallesVentaInput
  }

  export type DetalleVentaUncheckedCreateInput = {
    id?: number
    ventaId: number
    productoId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type DetalleVentaUpdateInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    venta?: VentaUpdateOneRequiredWithoutDetallesNestedInput
    producto?: ProductoUpdateOneRequiredWithoutDetallesVentaNestedInput
  }

  export type DetalleVentaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ventaId?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DetalleVentaCreateManyInput = {
    id?: number
    ventaId: number
    productoId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type DetalleVentaUpdateManyMutationInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DetalleVentaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ventaId?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type EntradaMercaderiaCreateInput = {
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    creadoEn?: Date | string
    producto: ProductoCreateNestedOneWithoutEntradasMercaderiaInput
    proveedor: ProveedorCreateNestedOneWithoutEntradasMercaderiaInput
    usuario: UsuarioCreateNestedOneWithoutEntradasMercaderiaInput
  }

  export type EntradaMercaderiaUncheckedCreateInput = {
    id?: number
    productoId: number
    proveedorId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type EntradaMercaderiaUpdateInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutEntradasMercaderiaNestedInput
    proveedor?: ProveedorUpdateOneRequiredWithoutEntradasMercaderiaNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutEntradasMercaderiaNestedInput
  }

  export type EntradaMercaderiaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    proveedorId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntradaMercaderiaCreateManyInput = {
    id?: number
    productoId: number
    proveedorId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type EntradaMercaderiaUpdateManyMutationInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntradaMercaderiaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    proveedorId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BajaInventarioCreateInput = {
    cantidad: number
    motivo: string
    creadoEn?: Date | string
    producto: ProductoCreateNestedOneWithoutBajasInput
    usuario: UsuarioCreateNestedOneWithoutBajasInput
  }

  export type BajaInventarioUncheckedCreateInput = {
    id?: number
    productoId: number
    cantidad: number
    motivo: string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type BajaInventarioUpdateInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutBajasNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutBajasNestedInput
  }

  export type BajaInventarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BajaInventarioCreateManyInput = {
    id?: number
    productoId: number
    cantidad: number
    motivo: string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type BajaInventarioUpdateManyMutationInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BajaInventarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudReposicionCreateInput = {
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
    producto: ProductoCreateNestedOneWithoutSolicitudesInput
    usuario: UsuarioCreateNestedOneWithoutSolicitudesInput
    proveedor?: ProveedorCreateNestedOneWithoutSolicitudesInput
  }

  export type SolicitudReposicionUncheckedCreateInput = {
    id?: number
    productoId: number
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    usuarioId: number
    proveedorId?: number | null
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
  }

  export type SolicitudReposicionUpdateInput = {
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutSolicitudesNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutSolicitudesNestedInput
    proveedor?: ProveedorUpdateOneWithoutSolicitudesNestedInput
  }

  export type SolicitudReposicionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    proveedorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudReposicionCreateManyInput = {
    id?: number
    productoId: number
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    usuarioId: number
    proveedorId?: number | null
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
  }

  export type SolicitudReposicionUpdateManyMutationInput = {
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudReposicionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    proveedorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LogAccesoListRelationFilter = {
    every?: LogAccesoWhereInput
    some?: LogAccesoWhereInput
    none?: LogAccesoWhereInput
  }

  export type VentaListRelationFilter = {
    every?: VentaWhereInput
    some?: VentaWhereInput
    none?: VentaWhereInput
  }

  export type EntradaMercaderiaListRelationFilter = {
    every?: EntradaMercaderiaWhereInput
    some?: EntradaMercaderiaWhereInput
    none?: EntradaMercaderiaWhereInput
  }

  export type BajaInventarioListRelationFilter = {
    every?: BajaInventarioWhereInput
    some?: BajaInventarioWhereInput
    none?: BajaInventarioWhereInput
  }

  export type SolicitudReposicionListRelationFilter = {
    every?: SolicitudReposicionWhereInput
    some?: SolicitudReposicionWhereInput
    none?: SolicitudReposicionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LogAccesoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VentaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EntradaMercaderiaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BajaInventarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SolicitudReposicionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    resetCode?: SortOrder
    resetExpiry?: SortOrder
    creadoEn?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    resetCode?: SortOrder
    resetExpiry?: SortOrder
    creadoEn?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    resetCode?: SortOrder
    resetExpiry?: SortOrder
    creadoEn?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type LogAccesoCountOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    rol?: SortOrder
    timestamp?: SortOrder
    archivado?: SortOrder
  }

  export type LogAccesoAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type LogAccesoMaxOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    rol?: SortOrder
    timestamp?: SortOrder
    archivado?: SortOrder
  }

  export type LogAccesoMinOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    rol?: SortOrder
    timestamp?: SortOrder
    archivado?: SortOrder
  }

  export type LogAccesoSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
  }

  export type ProductoListRelationFilter = {
    every?: ProductoWhereInput
    some?: ProductoWhereInput
    none?: ProductoWhereInput
  }

  export type ProductoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoriaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type CategoriaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoriaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type CategoriaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
  }

  export type CategoriaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CategoriaScalarRelationFilter = {
    is?: CategoriaWhereInput
    isNot?: CategoriaWhereInput
  }

  export type DetalleVentaListRelationFilter = {
    every?: DetalleVentaWhereInput
    some?: DetalleVentaWhereInput
    none?: DetalleVentaWhereInput
  }

  export type DetalleVentaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductoNombreActivoCompoundUniqueInput = {
    nombre: string
    activo: boolean
  }

  export type ProductoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    marca?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    fechaVencimiento?: SortOrder
    activo?: SortOrder
    categoriaId?: SortOrder
    creadoEn?: SortOrder
  }

  export type ProductoAvgOrderByAggregateInput = {
    id?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    categoriaId?: SortOrder
  }

  export type ProductoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    marca?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    fechaVencimiento?: SortOrder
    activo?: SortOrder
    categoriaId?: SortOrder
    creadoEn?: SortOrder
  }

  export type ProductoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    marca?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    fechaVencimiento?: SortOrder
    activo?: SortOrder
    categoriaId?: SortOrder
    creadoEn?: SortOrder
  }

  export type ProductoSumOrderByAggregateInput = {
    id?: SortOrder
    precio?: SortOrder
    stock?: SortOrder
    categoriaId?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ProveedorCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    contacto?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
  }

  export type ProveedorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProveedorMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    contacto?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
  }

  export type ProveedorMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    contacto?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
  }

  export type ProveedorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ConfigSistemaCountOrderByAggregateInput = {
    clave?: SortOrder
    valor?: SortOrder
  }

  export type ConfigSistemaMaxOrderByAggregateInput = {
    clave?: SortOrder
    valor?: SortOrder
  }

  export type ConfigSistemaMinOrderByAggregateInput = {
    clave?: SortOrder
    valor?: SortOrder
  }

  export type ClienteCountOrderByAggregateInput = {
    id?: SortOrder
    dni?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
  }

  export type ClienteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    dni?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
  }

  export type ClienteMinOrderByAggregateInput = {
    id?: SortOrder
    dni?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    activo?: SortOrder
    creadoEn?: SortOrder
  }

  export type ClienteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ClienteNullableScalarRelationFilter = {
    is?: ClienteWhereInput | null
    isNot?: ClienteWhereInput | null
  }

  export type VentaCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    usuarioId?: SortOrder
    clienteId?: SortOrder
    subtotal?: SortOrder
    igv?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    montoRecibido?: SortOrder
    vuelto?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
  }

  export type VentaAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    clienteId?: SortOrder
    subtotal?: SortOrder
    igv?: SortOrder
    total?: SortOrder
    montoRecibido?: SortOrder
    vuelto?: SortOrder
  }

  export type VentaMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    usuarioId?: SortOrder
    clienteId?: SortOrder
    subtotal?: SortOrder
    igv?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    montoRecibido?: SortOrder
    vuelto?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
  }

  export type VentaMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    usuarioId?: SortOrder
    clienteId?: SortOrder
    subtotal?: SortOrder
    igv?: SortOrder
    total?: SortOrder
    metodoPago?: SortOrder
    montoRecibido?: SortOrder
    vuelto?: SortOrder
    estado?: SortOrder
    creadoEn?: SortOrder
  }

  export type VentaSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    clienteId?: SortOrder
    subtotal?: SortOrder
    igv?: SortOrder
    total?: SortOrder
    montoRecibido?: SortOrder
    vuelto?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type VentaScalarRelationFilter = {
    is?: VentaWhereInput
    isNot?: VentaWhereInput
  }

  export type ProductoScalarRelationFilter = {
    is?: ProductoWhereInput
    isNot?: ProductoWhereInput
  }

  export type DetalleVentaCountOrderByAggregateInput = {
    id?: SortOrder
    ventaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type DetalleVentaAvgOrderByAggregateInput = {
    id?: SortOrder
    ventaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type DetalleVentaMaxOrderByAggregateInput = {
    id?: SortOrder
    ventaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type DetalleVentaMinOrderByAggregateInput = {
    id?: SortOrder
    ventaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type DetalleVentaSumOrderByAggregateInput = {
    id?: SortOrder
    ventaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    subtotal?: SortOrder
  }

  export type ProveedorScalarRelationFilter = {
    is?: ProveedorWhereInput
    isNot?: ProveedorWhereInput
  }

  export type EntradaMercaderiaCountOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    proveedorId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
  }

  export type EntradaMercaderiaAvgOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    proveedorId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    usuarioId?: SortOrder
  }

  export type EntradaMercaderiaMaxOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    proveedorId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
  }

  export type EntradaMercaderiaMinOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    proveedorId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
  }

  export type EntradaMercaderiaSumOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    proveedorId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    usuarioId?: SortOrder
  }

  export type BajaInventarioCountOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    motivo?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
  }

  export type BajaInventarioAvgOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    usuarioId?: SortOrder
  }

  export type BajaInventarioMaxOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    motivo?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
  }

  export type BajaInventarioMinOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    motivo?: SortOrder
    usuarioId?: SortOrder
    creadoEn?: SortOrder
  }

  export type BajaInventarioSumOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    usuarioId?: SortOrder
  }

  export type ProveedorNullableScalarRelationFilter = {
    is?: ProveedorWhereInput | null
    isNot?: ProveedorWhereInput | null
  }

  export type SolicitudReposicionCountOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidadActual?: SortOrder
    cantidadSolicitada?: SortOrder
    estado?: SortOrder
    usuarioId?: SortOrder
    proveedorId?: SortOrder
    fechaEstimada?: SortOrder
    notaRechazo?: SortOrder
    creadoEn?: SortOrder
  }

  export type SolicitudReposicionAvgOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidadActual?: SortOrder
    cantidadSolicitada?: SortOrder
    usuarioId?: SortOrder
    proveedorId?: SortOrder
  }

  export type SolicitudReposicionMaxOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidadActual?: SortOrder
    cantidadSolicitada?: SortOrder
    estado?: SortOrder
    usuarioId?: SortOrder
    proveedorId?: SortOrder
    fechaEstimada?: SortOrder
    notaRechazo?: SortOrder
    creadoEn?: SortOrder
  }

  export type SolicitudReposicionMinOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidadActual?: SortOrder
    cantidadSolicitada?: SortOrder
    estado?: SortOrder
    usuarioId?: SortOrder
    proveedorId?: SortOrder
    fechaEstimada?: SortOrder
    notaRechazo?: SortOrder
    creadoEn?: SortOrder
  }

  export type SolicitudReposicionSumOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    cantidadActual?: SortOrder
    cantidadSolicitada?: SortOrder
    usuarioId?: SortOrder
    proveedorId?: SortOrder
  }

  export type LogAccesoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<LogAccesoCreateWithoutUsuarioInput, LogAccesoUncheckedCreateWithoutUsuarioInput> | LogAccesoCreateWithoutUsuarioInput[] | LogAccesoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: LogAccesoCreateOrConnectWithoutUsuarioInput | LogAccesoCreateOrConnectWithoutUsuarioInput[]
    createMany?: LogAccesoCreateManyUsuarioInputEnvelope
    connect?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
  }

  export type VentaCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<VentaCreateWithoutUsuarioInput, VentaUncheckedCreateWithoutUsuarioInput> | VentaCreateWithoutUsuarioInput[] | VentaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: VentaCreateOrConnectWithoutUsuarioInput | VentaCreateOrConnectWithoutUsuarioInput[]
    createMany?: VentaCreateManyUsuarioInputEnvelope
    connect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
  }

  export type EntradaMercaderiaCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutUsuarioInput, EntradaMercaderiaUncheckedCreateWithoutUsuarioInput> | EntradaMercaderiaCreateWithoutUsuarioInput[] | EntradaMercaderiaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutUsuarioInput | EntradaMercaderiaCreateOrConnectWithoutUsuarioInput[]
    createMany?: EntradaMercaderiaCreateManyUsuarioInputEnvelope
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
  }

  export type BajaInventarioCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<BajaInventarioCreateWithoutUsuarioInput, BajaInventarioUncheckedCreateWithoutUsuarioInput> | BajaInventarioCreateWithoutUsuarioInput[] | BajaInventarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: BajaInventarioCreateOrConnectWithoutUsuarioInput | BajaInventarioCreateOrConnectWithoutUsuarioInput[]
    createMany?: BajaInventarioCreateManyUsuarioInputEnvelope
    connect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
  }

  export type SolicitudReposicionCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<SolicitudReposicionCreateWithoutUsuarioInput, SolicitudReposicionUncheckedCreateWithoutUsuarioInput> | SolicitudReposicionCreateWithoutUsuarioInput[] | SolicitudReposicionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutUsuarioInput | SolicitudReposicionCreateOrConnectWithoutUsuarioInput[]
    createMany?: SolicitudReposicionCreateManyUsuarioInputEnvelope
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
  }

  export type LogAccesoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<LogAccesoCreateWithoutUsuarioInput, LogAccesoUncheckedCreateWithoutUsuarioInput> | LogAccesoCreateWithoutUsuarioInput[] | LogAccesoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: LogAccesoCreateOrConnectWithoutUsuarioInput | LogAccesoCreateOrConnectWithoutUsuarioInput[]
    createMany?: LogAccesoCreateManyUsuarioInputEnvelope
    connect?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
  }

  export type VentaUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<VentaCreateWithoutUsuarioInput, VentaUncheckedCreateWithoutUsuarioInput> | VentaCreateWithoutUsuarioInput[] | VentaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: VentaCreateOrConnectWithoutUsuarioInput | VentaCreateOrConnectWithoutUsuarioInput[]
    createMany?: VentaCreateManyUsuarioInputEnvelope
    connect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
  }

  export type EntradaMercaderiaUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutUsuarioInput, EntradaMercaderiaUncheckedCreateWithoutUsuarioInput> | EntradaMercaderiaCreateWithoutUsuarioInput[] | EntradaMercaderiaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutUsuarioInput | EntradaMercaderiaCreateOrConnectWithoutUsuarioInput[]
    createMany?: EntradaMercaderiaCreateManyUsuarioInputEnvelope
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
  }

  export type BajaInventarioUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<BajaInventarioCreateWithoutUsuarioInput, BajaInventarioUncheckedCreateWithoutUsuarioInput> | BajaInventarioCreateWithoutUsuarioInput[] | BajaInventarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: BajaInventarioCreateOrConnectWithoutUsuarioInput | BajaInventarioCreateOrConnectWithoutUsuarioInput[]
    createMany?: BajaInventarioCreateManyUsuarioInputEnvelope
    connect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
  }

  export type SolicitudReposicionUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<SolicitudReposicionCreateWithoutUsuarioInput, SolicitudReposicionUncheckedCreateWithoutUsuarioInput> | SolicitudReposicionCreateWithoutUsuarioInput[] | SolicitudReposicionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutUsuarioInput | SolicitudReposicionCreateOrConnectWithoutUsuarioInput[]
    createMany?: SolicitudReposicionCreateManyUsuarioInputEnvelope
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LogAccesoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<LogAccesoCreateWithoutUsuarioInput, LogAccesoUncheckedCreateWithoutUsuarioInput> | LogAccesoCreateWithoutUsuarioInput[] | LogAccesoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: LogAccesoCreateOrConnectWithoutUsuarioInput | LogAccesoCreateOrConnectWithoutUsuarioInput[]
    upsert?: LogAccesoUpsertWithWhereUniqueWithoutUsuarioInput | LogAccesoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: LogAccesoCreateManyUsuarioInputEnvelope
    set?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
    disconnect?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
    delete?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
    connect?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
    update?: LogAccesoUpdateWithWhereUniqueWithoutUsuarioInput | LogAccesoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: LogAccesoUpdateManyWithWhereWithoutUsuarioInput | LogAccesoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: LogAccesoScalarWhereInput | LogAccesoScalarWhereInput[]
  }

  export type VentaUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<VentaCreateWithoutUsuarioInput, VentaUncheckedCreateWithoutUsuarioInput> | VentaCreateWithoutUsuarioInput[] | VentaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: VentaCreateOrConnectWithoutUsuarioInput | VentaCreateOrConnectWithoutUsuarioInput[]
    upsert?: VentaUpsertWithWhereUniqueWithoutUsuarioInput | VentaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: VentaCreateManyUsuarioInputEnvelope
    set?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    disconnect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    delete?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    connect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    update?: VentaUpdateWithWhereUniqueWithoutUsuarioInput | VentaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: VentaUpdateManyWithWhereWithoutUsuarioInput | VentaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: VentaScalarWhereInput | VentaScalarWhereInput[]
  }

  export type EntradaMercaderiaUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutUsuarioInput, EntradaMercaderiaUncheckedCreateWithoutUsuarioInput> | EntradaMercaderiaCreateWithoutUsuarioInput[] | EntradaMercaderiaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutUsuarioInput | EntradaMercaderiaCreateOrConnectWithoutUsuarioInput[]
    upsert?: EntradaMercaderiaUpsertWithWhereUniqueWithoutUsuarioInput | EntradaMercaderiaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: EntradaMercaderiaCreateManyUsuarioInputEnvelope
    set?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    disconnect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    delete?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    update?: EntradaMercaderiaUpdateWithWhereUniqueWithoutUsuarioInput | EntradaMercaderiaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: EntradaMercaderiaUpdateManyWithWhereWithoutUsuarioInput | EntradaMercaderiaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: EntradaMercaderiaScalarWhereInput | EntradaMercaderiaScalarWhereInput[]
  }

  export type BajaInventarioUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<BajaInventarioCreateWithoutUsuarioInput, BajaInventarioUncheckedCreateWithoutUsuarioInput> | BajaInventarioCreateWithoutUsuarioInput[] | BajaInventarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: BajaInventarioCreateOrConnectWithoutUsuarioInput | BajaInventarioCreateOrConnectWithoutUsuarioInput[]
    upsert?: BajaInventarioUpsertWithWhereUniqueWithoutUsuarioInput | BajaInventarioUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: BajaInventarioCreateManyUsuarioInputEnvelope
    set?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    disconnect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    delete?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    connect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    update?: BajaInventarioUpdateWithWhereUniqueWithoutUsuarioInput | BajaInventarioUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: BajaInventarioUpdateManyWithWhereWithoutUsuarioInput | BajaInventarioUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: BajaInventarioScalarWhereInput | BajaInventarioScalarWhereInput[]
  }

  export type SolicitudReposicionUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<SolicitudReposicionCreateWithoutUsuarioInput, SolicitudReposicionUncheckedCreateWithoutUsuarioInput> | SolicitudReposicionCreateWithoutUsuarioInput[] | SolicitudReposicionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutUsuarioInput | SolicitudReposicionCreateOrConnectWithoutUsuarioInput[]
    upsert?: SolicitudReposicionUpsertWithWhereUniqueWithoutUsuarioInput | SolicitudReposicionUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: SolicitudReposicionCreateManyUsuarioInputEnvelope
    set?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    disconnect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    delete?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    update?: SolicitudReposicionUpdateWithWhereUniqueWithoutUsuarioInput | SolicitudReposicionUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: SolicitudReposicionUpdateManyWithWhereWithoutUsuarioInput | SolicitudReposicionUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: SolicitudReposicionScalarWhereInput | SolicitudReposicionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LogAccesoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<LogAccesoCreateWithoutUsuarioInput, LogAccesoUncheckedCreateWithoutUsuarioInput> | LogAccesoCreateWithoutUsuarioInput[] | LogAccesoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: LogAccesoCreateOrConnectWithoutUsuarioInput | LogAccesoCreateOrConnectWithoutUsuarioInput[]
    upsert?: LogAccesoUpsertWithWhereUniqueWithoutUsuarioInput | LogAccesoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: LogAccesoCreateManyUsuarioInputEnvelope
    set?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
    disconnect?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
    delete?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
    connect?: LogAccesoWhereUniqueInput | LogAccesoWhereUniqueInput[]
    update?: LogAccesoUpdateWithWhereUniqueWithoutUsuarioInput | LogAccesoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: LogAccesoUpdateManyWithWhereWithoutUsuarioInput | LogAccesoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: LogAccesoScalarWhereInput | LogAccesoScalarWhereInput[]
  }

  export type VentaUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<VentaCreateWithoutUsuarioInput, VentaUncheckedCreateWithoutUsuarioInput> | VentaCreateWithoutUsuarioInput[] | VentaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: VentaCreateOrConnectWithoutUsuarioInput | VentaCreateOrConnectWithoutUsuarioInput[]
    upsert?: VentaUpsertWithWhereUniqueWithoutUsuarioInput | VentaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: VentaCreateManyUsuarioInputEnvelope
    set?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    disconnect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    delete?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    connect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    update?: VentaUpdateWithWhereUniqueWithoutUsuarioInput | VentaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: VentaUpdateManyWithWhereWithoutUsuarioInput | VentaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: VentaScalarWhereInput | VentaScalarWhereInput[]
  }

  export type EntradaMercaderiaUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutUsuarioInput, EntradaMercaderiaUncheckedCreateWithoutUsuarioInput> | EntradaMercaderiaCreateWithoutUsuarioInput[] | EntradaMercaderiaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutUsuarioInput | EntradaMercaderiaCreateOrConnectWithoutUsuarioInput[]
    upsert?: EntradaMercaderiaUpsertWithWhereUniqueWithoutUsuarioInput | EntradaMercaderiaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: EntradaMercaderiaCreateManyUsuarioInputEnvelope
    set?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    disconnect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    delete?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    update?: EntradaMercaderiaUpdateWithWhereUniqueWithoutUsuarioInput | EntradaMercaderiaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: EntradaMercaderiaUpdateManyWithWhereWithoutUsuarioInput | EntradaMercaderiaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: EntradaMercaderiaScalarWhereInput | EntradaMercaderiaScalarWhereInput[]
  }

  export type BajaInventarioUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<BajaInventarioCreateWithoutUsuarioInput, BajaInventarioUncheckedCreateWithoutUsuarioInput> | BajaInventarioCreateWithoutUsuarioInput[] | BajaInventarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: BajaInventarioCreateOrConnectWithoutUsuarioInput | BajaInventarioCreateOrConnectWithoutUsuarioInput[]
    upsert?: BajaInventarioUpsertWithWhereUniqueWithoutUsuarioInput | BajaInventarioUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: BajaInventarioCreateManyUsuarioInputEnvelope
    set?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    disconnect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    delete?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    connect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    update?: BajaInventarioUpdateWithWhereUniqueWithoutUsuarioInput | BajaInventarioUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: BajaInventarioUpdateManyWithWhereWithoutUsuarioInput | BajaInventarioUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: BajaInventarioScalarWhereInput | BajaInventarioScalarWhereInput[]
  }

  export type SolicitudReposicionUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<SolicitudReposicionCreateWithoutUsuarioInput, SolicitudReposicionUncheckedCreateWithoutUsuarioInput> | SolicitudReposicionCreateWithoutUsuarioInput[] | SolicitudReposicionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutUsuarioInput | SolicitudReposicionCreateOrConnectWithoutUsuarioInput[]
    upsert?: SolicitudReposicionUpsertWithWhereUniqueWithoutUsuarioInput | SolicitudReposicionUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: SolicitudReposicionCreateManyUsuarioInputEnvelope
    set?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    disconnect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    delete?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    update?: SolicitudReposicionUpdateWithWhereUniqueWithoutUsuarioInput | SolicitudReposicionUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: SolicitudReposicionUpdateManyWithWhereWithoutUsuarioInput | SolicitudReposicionUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: SolicitudReposicionScalarWhereInput | SolicitudReposicionScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutLogAccesosInput = {
    create?: XOR<UsuarioCreateWithoutLogAccesosInput, UsuarioUncheckedCreateWithoutLogAccesosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutLogAccesosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutLogAccesosNestedInput = {
    create?: XOR<UsuarioCreateWithoutLogAccesosInput, UsuarioUncheckedCreateWithoutLogAccesosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutLogAccesosInput
    upsert?: UsuarioUpsertWithoutLogAccesosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutLogAccesosInput, UsuarioUpdateWithoutLogAccesosInput>, UsuarioUncheckedUpdateWithoutLogAccesosInput>
  }

  export type ProductoCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type ProductoUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type ProductoUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutCategoriaInput | ProductoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutCategoriaInput | ProductoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutCategoriaInput | ProductoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type ProductoUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutCategoriaInput | ProductoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutCategoriaInput | ProductoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutCategoriaInput | ProductoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type CategoriaCreateNestedOneWithoutProductosInput = {
    create?: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProductosInput
    connect?: CategoriaWhereUniqueInput
  }

  export type DetalleVentaCreateNestedManyWithoutProductoInput = {
    create?: XOR<DetalleVentaCreateWithoutProductoInput, DetalleVentaUncheckedCreateWithoutProductoInput> | DetalleVentaCreateWithoutProductoInput[] | DetalleVentaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleVentaCreateOrConnectWithoutProductoInput | DetalleVentaCreateOrConnectWithoutProductoInput[]
    createMany?: DetalleVentaCreateManyProductoInputEnvelope
    connect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
  }

  export type EntradaMercaderiaCreateNestedManyWithoutProductoInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutProductoInput, EntradaMercaderiaUncheckedCreateWithoutProductoInput> | EntradaMercaderiaCreateWithoutProductoInput[] | EntradaMercaderiaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutProductoInput | EntradaMercaderiaCreateOrConnectWithoutProductoInput[]
    createMany?: EntradaMercaderiaCreateManyProductoInputEnvelope
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
  }

  export type BajaInventarioCreateNestedManyWithoutProductoInput = {
    create?: XOR<BajaInventarioCreateWithoutProductoInput, BajaInventarioUncheckedCreateWithoutProductoInput> | BajaInventarioCreateWithoutProductoInput[] | BajaInventarioUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: BajaInventarioCreateOrConnectWithoutProductoInput | BajaInventarioCreateOrConnectWithoutProductoInput[]
    createMany?: BajaInventarioCreateManyProductoInputEnvelope
    connect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
  }

  export type SolicitudReposicionCreateNestedManyWithoutProductoInput = {
    create?: XOR<SolicitudReposicionCreateWithoutProductoInput, SolicitudReposicionUncheckedCreateWithoutProductoInput> | SolicitudReposicionCreateWithoutProductoInput[] | SolicitudReposicionUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutProductoInput | SolicitudReposicionCreateOrConnectWithoutProductoInput[]
    createMany?: SolicitudReposicionCreateManyProductoInputEnvelope
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
  }

  export type DetalleVentaUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<DetalleVentaCreateWithoutProductoInput, DetalleVentaUncheckedCreateWithoutProductoInput> | DetalleVentaCreateWithoutProductoInput[] | DetalleVentaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleVentaCreateOrConnectWithoutProductoInput | DetalleVentaCreateOrConnectWithoutProductoInput[]
    createMany?: DetalleVentaCreateManyProductoInputEnvelope
    connect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
  }

  export type EntradaMercaderiaUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutProductoInput, EntradaMercaderiaUncheckedCreateWithoutProductoInput> | EntradaMercaderiaCreateWithoutProductoInput[] | EntradaMercaderiaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutProductoInput | EntradaMercaderiaCreateOrConnectWithoutProductoInput[]
    createMany?: EntradaMercaderiaCreateManyProductoInputEnvelope
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
  }

  export type BajaInventarioUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<BajaInventarioCreateWithoutProductoInput, BajaInventarioUncheckedCreateWithoutProductoInput> | BajaInventarioCreateWithoutProductoInput[] | BajaInventarioUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: BajaInventarioCreateOrConnectWithoutProductoInput | BajaInventarioCreateOrConnectWithoutProductoInput[]
    createMany?: BajaInventarioCreateManyProductoInputEnvelope
    connect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
  }

  export type SolicitudReposicionUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<SolicitudReposicionCreateWithoutProductoInput, SolicitudReposicionUncheckedCreateWithoutProductoInput> | SolicitudReposicionCreateWithoutProductoInput[] | SolicitudReposicionUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutProductoInput | SolicitudReposicionCreateOrConnectWithoutProductoInput[]
    createMany?: SolicitudReposicionCreateManyProductoInputEnvelope
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CategoriaUpdateOneRequiredWithoutProductosNestedInput = {
    create?: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProductosInput
    upsert?: CategoriaUpsertWithoutProductosInput
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutProductosInput, CategoriaUpdateWithoutProductosInput>, CategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type DetalleVentaUpdateManyWithoutProductoNestedInput = {
    create?: XOR<DetalleVentaCreateWithoutProductoInput, DetalleVentaUncheckedCreateWithoutProductoInput> | DetalleVentaCreateWithoutProductoInput[] | DetalleVentaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleVentaCreateOrConnectWithoutProductoInput | DetalleVentaCreateOrConnectWithoutProductoInput[]
    upsert?: DetalleVentaUpsertWithWhereUniqueWithoutProductoInput | DetalleVentaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: DetalleVentaCreateManyProductoInputEnvelope
    set?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    disconnect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    delete?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    connect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    update?: DetalleVentaUpdateWithWhereUniqueWithoutProductoInput | DetalleVentaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: DetalleVentaUpdateManyWithWhereWithoutProductoInput | DetalleVentaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: DetalleVentaScalarWhereInput | DetalleVentaScalarWhereInput[]
  }

  export type EntradaMercaderiaUpdateManyWithoutProductoNestedInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutProductoInput, EntradaMercaderiaUncheckedCreateWithoutProductoInput> | EntradaMercaderiaCreateWithoutProductoInput[] | EntradaMercaderiaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutProductoInput | EntradaMercaderiaCreateOrConnectWithoutProductoInput[]
    upsert?: EntradaMercaderiaUpsertWithWhereUniqueWithoutProductoInput | EntradaMercaderiaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: EntradaMercaderiaCreateManyProductoInputEnvelope
    set?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    disconnect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    delete?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    update?: EntradaMercaderiaUpdateWithWhereUniqueWithoutProductoInput | EntradaMercaderiaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: EntradaMercaderiaUpdateManyWithWhereWithoutProductoInput | EntradaMercaderiaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: EntradaMercaderiaScalarWhereInput | EntradaMercaderiaScalarWhereInput[]
  }

  export type BajaInventarioUpdateManyWithoutProductoNestedInput = {
    create?: XOR<BajaInventarioCreateWithoutProductoInput, BajaInventarioUncheckedCreateWithoutProductoInput> | BajaInventarioCreateWithoutProductoInput[] | BajaInventarioUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: BajaInventarioCreateOrConnectWithoutProductoInput | BajaInventarioCreateOrConnectWithoutProductoInput[]
    upsert?: BajaInventarioUpsertWithWhereUniqueWithoutProductoInput | BajaInventarioUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: BajaInventarioCreateManyProductoInputEnvelope
    set?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    disconnect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    delete?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    connect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    update?: BajaInventarioUpdateWithWhereUniqueWithoutProductoInput | BajaInventarioUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: BajaInventarioUpdateManyWithWhereWithoutProductoInput | BajaInventarioUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: BajaInventarioScalarWhereInput | BajaInventarioScalarWhereInput[]
  }

  export type SolicitudReposicionUpdateManyWithoutProductoNestedInput = {
    create?: XOR<SolicitudReposicionCreateWithoutProductoInput, SolicitudReposicionUncheckedCreateWithoutProductoInput> | SolicitudReposicionCreateWithoutProductoInput[] | SolicitudReposicionUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutProductoInput | SolicitudReposicionCreateOrConnectWithoutProductoInput[]
    upsert?: SolicitudReposicionUpsertWithWhereUniqueWithoutProductoInput | SolicitudReposicionUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: SolicitudReposicionCreateManyProductoInputEnvelope
    set?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    disconnect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    delete?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    update?: SolicitudReposicionUpdateWithWhereUniqueWithoutProductoInput | SolicitudReposicionUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: SolicitudReposicionUpdateManyWithWhereWithoutProductoInput | SolicitudReposicionUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: SolicitudReposicionScalarWhereInput | SolicitudReposicionScalarWhereInput[]
  }

  export type DetalleVentaUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<DetalleVentaCreateWithoutProductoInput, DetalleVentaUncheckedCreateWithoutProductoInput> | DetalleVentaCreateWithoutProductoInput[] | DetalleVentaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleVentaCreateOrConnectWithoutProductoInput | DetalleVentaCreateOrConnectWithoutProductoInput[]
    upsert?: DetalleVentaUpsertWithWhereUniqueWithoutProductoInput | DetalleVentaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: DetalleVentaCreateManyProductoInputEnvelope
    set?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    disconnect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    delete?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    connect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    update?: DetalleVentaUpdateWithWhereUniqueWithoutProductoInput | DetalleVentaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: DetalleVentaUpdateManyWithWhereWithoutProductoInput | DetalleVentaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: DetalleVentaScalarWhereInput | DetalleVentaScalarWhereInput[]
  }

  export type EntradaMercaderiaUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutProductoInput, EntradaMercaderiaUncheckedCreateWithoutProductoInput> | EntradaMercaderiaCreateWithoutProductoInput[] | EntradaMercaderiaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutProductoInput | EntradaMercaderiaCreateOrConnectWithoutProductoInput[]
    upsert?: EntradaMercaderiaUpsertWithWhereUniqueWithoutProductoInput | EntradaMercaderiaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: EntradaMercaderiaCreateManyProductoInputEnvelope
    set?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    disconnect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    delete?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    update?: EntradaMercaderiaUpdateWithWhereUniqueWithoutProductoInput | EntradaMercaderiaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: EntradaMercaderiaUpdateManyWithWhereWithoutProductoInput | EntradaMercaderiaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: EntradaMercaderiaScalarWhereInput | EntradaMercaderiaScalarWhereInput[]
  }

  export type BajaInventarioUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<BajaInventarioCreateWithoutProductoInput, BajaInventarioUncheckedCreateWithoutProductoInput> | BajaInventarioCreateWithoutProductoInput[] | BajaInventarioUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: BajaInventarioCreateOrConnectWithoutProductoInput | BajaInventarioCreateOrConnectWithoutProductoInput[]
    upsert?: BajaInventarioUpsertWithWhereUniqueWithoutProductoInput | BajaInventarioUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: BajaInventarioCreateManyProductoInputEnvelope
    set?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    disconnect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    delete?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    connect?: BajaInventarioWhereUniqueInput | BajaInventarioWhereUniqueInput[]
    update?: BajaInventarioUpdateWithWhereUniqueWithoutProductoInput | BajaInventarioUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: BajaInventarioUpdateManyWithWhereWithoutProductoInput | BajaInventarioUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: BajaInventarioScalarWhereInput | BajaInventarioScalarWhereInput[]
  }

  export type SolicitudReposicionUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<SolicitudReposicionCreateWithoutProductoInput, SolicitudReposicionUncheckedCreateWithoutProductoInput> | SolicitudReposicionCreateWithoutProductoInput[] | SolicitudReposicionUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutProductoInput | SolicitudReposicionCreateOrConnectWithoutProductoInput[]
    upsert?: SolicitudReposicionUpsertWithWhereUniqueWithoutProductoInput | SolicitudReposicionUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: SolicitudReposicionCreateManyProductoInputEnvelope
    set?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    disconnect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    delete?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    update?: SolicitudReposicionUpdateWithWhereUniqueWithoutProductoInput | SolicitudReposicionUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: SolicitudReposicionUpdateManyWithWhereWithoutProductoInput | SolicitudReposicionUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: SolicitudReposicionScalarWhereInput | SolicitudReposicionScalarWhereInput[]
  }

  export type EntradaMercaderiaCreateNestedManyWithoutProveedorInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutProveedorInput, EntradaMercaderiaUncheckedCreateWithoutProveedorInput> | EntradaMercaderiaCreateWithoutProveedorInput[] | EntradaMercaderiaUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutProveedorInput | EntradaMercaderiaCreateOrConnectWithoutProveedorInput[]
    createMany?: EntradaMercaderiaCreateManyProveedorInputEnvelope
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
  }

  export type SolicitudReposicionCreateNestedManyWithoutProveedorInput = {
    create?: XOR<SolicitudReposicionCreateWithoutProveedorInput, SolicitudReposicionUncheckedCreateWithoutProveedorInput> | SolicitudReposicionCreateWithoutProveedorInput[] | SolicitudReposicionUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutProveedorInput | SolicitudReposicionCreateOrConnectWithoutProveedorInput[]
    createMany?: SolicitudReposicionCreateManyProveedorInputEnvelope
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
  }

  export type EntradaMercaderiaUncheckedCreateNestedManyWithoutProveedorInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutProveedorInput, EntradaMercaderiaUncheckedCreateWithoutProveedorInput> | EntradaMercaderiaCreateWithoutProveedorInput[] | EntradaMercaderiaUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutProveedorInput | EntradaMercaderiaCreateOrConnectWithoutProveedorInput[]
    createMany?: EntradaMercaderiaCreateManyProveedorInputEnvelope
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
  }

  export type SolicitudReposicionUncheckedCreateNestedManyWithoutProveedorInput = {
    create?: XOR<SolicitudReposicionCreateWithoutProveedorInput, SolicitudReposicionUncheckedCreateWithoutProveedorInput> | SolicitudReposicionCreateWithoutProveedorInput[] | SolicitudReposicionUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutProveedorInput | SolicitudReposicionCreateOrConnectWithoutProveedorInput[]
    createMany?: SolicitudReposicionCreateManyProveedorInputEnvelope
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
  }

  export type EntradaMercaderiaUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutProveedorInput, EntradaMercaderiaUncheckedCreateWithoutProveedorInput> | EntradaMercaderiaCreateWithoutProveedorInput[] | EntradaMercaderiaUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutProveedorInput | EntradaMercaderiaCreateOrConnectWithoutProveedorInput[]
    upsert?: EntradaMercaderiaUpsertWithWhereUniqueWithoutProveedorInput | EntradaMercaderiaUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: EntradaMercaderiaCreateManyProveedorInputEnvelope
    set?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    disconnect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    delete?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    update?: EntradaMercaderiaUpdateWithWhereUniqueWithoutProveedorInput | EntradaMercaderiaUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: EntradaMercaderiaUpdateManyWithWhereWithoutProveedorInput | EntradaMercaderiaUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: EntradaMercaderiaScalarWhereInput | EntradaMercaderiaScalarWhereInput[]
  }

  export type SolicitudReposicionUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<SolicitudReposicionCreateWithoutProveedorInput, SolicitudReposicionUncheckedCreateWithoutProveedorInput> | SolicitudReposicionCreateWithoutProveedorInput[] | SolicitudReposicionUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutProveedorInput | SolicitudReposicionCreateOrConnectWithoutProveedorInput[]
    upsert?: SolicitudReposicionUpsertWithWhereUniqueWithoutProveedorInput | SolicitudReposicionUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: SolicitudReposicionCreateManyProveedorInputEnvelope
    set?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    disconnect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    delete?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    update?: SolicitudReposicionUpdateWithWhereUniqueWithoutProveedorInput | SolicitudReposicionUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: SolicitudReposicionUpdateManyWithWhereWithoutProveedorInput | SolicitudReposicionUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: SolicitudReposicionScalarWhereInput | SolicitudReposicionScalarWhereInput[]
  }

  export type EntradaMercaderiaUncheckedUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<EntradaMercaderiaCreateWithoutProveedorInput, EntradaMercaderiaUncheckedCreateWithoutProveedorInput> | EntradaMercaderiaCreateWithoutProveedorInput[] | EntradaMercaderiaUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: EntradaMercaderiaCreateOrConnectWithoutProveedorInput | EntradaMercaderiaCreateOrConnectWithoutProveedorInput[]
    upsert?: EntradaMercaderiaUpsertWithWhereUniqueWithoutProveedorInput | EntradaMercaderiaUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: EntradaMercaderiaCreateManyProveedorInputEnvelope
    set?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    disconnect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    delete?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    connect?: EntradaMercaderiaWhereUniqueInput | EntradaMercaderiaWhereUniqueInput[]
    update?: EntradaMercaderiaUpdateWithWhereUniqueWithoutProveedorInput | EntradaMercaderiaUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: EntradaMercaderiaUpdateManyWithWhereWithoutProveedorInput | EntradaMercaderiaUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: EntradaMercaderiaScalarWhereInput | EntradaMercaderiaScalarWhereInput[]
  }

  export type SolicitudReposicionUncheckedUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<SolicitudReposicionCreateWithoutProveedorInput, SolicitudReposicionUncheckedCreateWithoutProveedorInput> | SolicitudReposicionCreateWithoutProveedorInput[] | SolicitudReposicionUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: SolicitudReposicionCreateOrConnectWithoutProveedorInput | SolicitudReposicionCreateOrConnectWithoutProveedorInput[]
    upsert?: SolicitudReposicionUpsertWithWhereUniqueWithoutProveedorInput | SolicitudReposicionUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: SolicitudReposicionCreateManyProveedorInputEnvelope
    set?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    disconnect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    delete?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    connect?: SolicitudReposicionWhereUniqueInput | SolicitudReposicionWhereUniqueInput[]
    update?: SolicitudReposicionUpdateWithWhereUniqueWithoutProveedorInput | SolicitudReposicionUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: SolicitudReposicionUpdateManyWithWhereWithoutProveedorInput | SolicitudReposicionUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: SolicitudReposicionScalarWhereInput | SolicitudReposicionScalarWhereInput[]
  }

  export type VentaCreateNestedManyWithoutClienteInput = {
    create?: XOR<VentaCreateWithoutClienteInput, VentaUncheckedCreateWithoutClienteInput> | VentaCreateWithoutClienteInput[] | VentaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VentaCreateOrConnectWithoutClienteInput | VentaCreateOrConnectWithoutClienteInput[]
    createMany?: VentaCreateManyClienteInputEnvelope
    connect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
  }

  export type VentaUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<VentaCreateWithoutClienteInput, VentaUncheckedCreateWithoutClienteInput> | VentaCreateWithoutClienteInput[] | VentaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VentaCreateOrConnectWithoutClienteInput | VentaCreateOrConnectWithoutClienteInput[]
    createMany?: VentaCreateManyClienteInputEnvelope
    connect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
  }

  export type VentaUpdateManyWithoutClienteNestedInput = {
    create?: XOR<VentaCreateWithoutClienteInput, VentaUncheckedCreateWithoutClienteInput> | VentaCreateWithoutClienteInput[] | VentaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VentaCreateOrConnectWithoutClienteInput | VentaCreateOrConnectWithoutClienteInput[]
    upsert?: VentaUpsertWithWhereUniqueWithoutClienteInput | VentaUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: VentaCreateManyClienteInputEnvelope
    set?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    disconnect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    delete?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    connect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    update?: VentaUpdateWithWhereUniqueWithoutClienteInput | VentaUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: VentaUpdateManyWithWhereWithoutClienteInput | VentaUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: VentaScalarWhereInput | VentaScalarWhereInput[]
  }

  export type VentaUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<VentaCreateWithoutClienteInput, VentaUncheckedCreateWithoutClienteInput> | VentaCreateWithoutClienteInput[] | VentaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VentaCreateOrConnectWithoutClienteInput | VentaCreateOrConnectWithoutClienteInput[]
    upsert?: VentaUpsertWithWhereUniqueWithoutClienteInput | VentaUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: VentaCreateManyClienteInputEnvelope
    set?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    disconnect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    delete?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    connect?: VentaWhereUniqueInput | VentaWhereUniqueInput[]
    update?: VentaUpdateWithWhereUniqueWithoutClienteInput | VentaUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: VentaUpdateManyWithWhereWithoutClienteInput | VentaUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: VentaScalarWhereInput | VentaScalarWhereInput[]
  }

  export type DetalleVentaCreateNestedManyWithoutVentaInput = {
    create?: XOR<DetalleVentaCreateWithoutVentaInput, DetalleVentaUncheckedCreateWithoutVentaInput> | DetalleVentaCreateWithoutVentaInput[] | DetalleVentaUncheckedCreateWithoutVentaInput[]
    connectOrCreate?: DetalleVentaCreateOrConnectWithoutVentaInput | DetalleVentaCreateOrConnectWithoutVentaInput[]
    createMany?: DetalleVentaCreateManyVentaInputEnvelope
    connect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
  }

  export type UsuarioCreateNestedOneWithoutVentasInput = {
    create?: XOR<UsuarioCreateWithoutVentasInput, UsuarioUncheckedCreateWithoutVentasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutVentasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ClienteCreateNestedOneWithoutVentasInput = {
    create?: XOR<ClienteCreateWithoutVentasInput, ClienteUncheckedCreateWithoutVentasInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutVentasInput
    connect?: ClienteWhereUniqueInput
  }

  export type DetalleVentaUncheckedCreateNestedManyWithoutVentaInput = {
    create?: XOR<DetalleVentaCreateWithoutVentaInput, DetalleVentaUncheckedCreateWithoutVentaInput> | DetalleVentaCreateWithoutVentaInput[] | DetalleVentaUncheckedCreateWithoutVentaInput[]
    connectOrCreate?: DetalleVentaCreateOrConnectWithoutVentaInput | DetalleVentaCreateOrConnectWithoutVentaInput[]
    createMany?: DetalleVentaCreateManyVentaInputEnvelope
    connect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
  }

  export type DetalleVentaUpdateManyWithoutVentaNestedInput = {
    create?: XOR<DetalleVentaCreateWithoutVentaInput, DetalleVentaUncheckedCreateWithoutVentaInput> | DetalleVentaCreateWithoutVentaInput[] | DetalleVentaUncheckedCreateWithoutVentaInput[]
    connectOrCreate?: DetalleVentaCreateOrConnectWithoutVentaInput | DetalleVentaCreateOrConnectWithoutVentaInput[]
    upsert?: DetalleVentaUpsertWithWhereUniqueWithoutVentaInput | DetalleVentaUpsertWithWhereUniqueWithoutVentaInput[]
    createMany?: DetalleVentaCreateManyVentaInputEnvelope
    set?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    disconnect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    delete?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    connect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    update?: DetalleVentaUpdateWithWhereUniqueWithoutVentaInput | DetalleVentaUpdateWithWhereUniqueWithoutVentaInput[]
    updateMany?: DetalleVentaUpdateManyWithWhereWithoutVentaInput | DetalleVentaUpdateManyWithWhereWithoutVentaInput[]
    deleteMany?: DetalleVentaScalarWhereInput | DetalleVentaScalarWhereInput[]
  }

  export type UsuarioUpdateOneRequiredWithoutVentasNestedInput = {
    create?: XOR<UsuarioCreateWithoutVentasInput, UsuarioUncheckedCreateWithoutVentasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutVentasInput
    upsert?: UsuarioUpsertWithoutVentasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutVentasInput, UsuarioUpdateWithoutVentasInput>, UsuarioUncheckedUpdateWithoutVentasInput>
  }

  export type ClienteUpdateOneWithoutVentasNestedInput = {
    create?: XOR<ClienteCreateWithoutVentasInput, ClienteUncheckedCreateWithoutVentasInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutVentasInput
    upsert?: ClienteUpsertWithoutVentasInput
    disconnect?: ClienteWhereInput | boolean
    delete?: ClienteWhereInput | boolean
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutVentasInput, ClienteUpdateWithoutVentasInput>, ClienteUncheckedUpdateWithoutVentasInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DetalleVentaUncheckedUpdateManyWithoutVentaNestedInput = {
    create?: XOR<DetalleVentaCreateWithoutVentaInput, DetalleVentaUncheckedCreateWithoutVentaInput> | DetalleVentaCreateWithoutVentaInput[] | DetalleVentaUncheckedCreateWithoutVentaInput[]
    connectOrCreate?: DetalleVentaCreateOrConnectWithoutVentaInput | DetalleVentaCreateOrConnectWithoutVentaInput[]
    upsert?: DetalleVentaUpsertWithWhereUniqueWithoutVentaInput | DetalleVentaUpsertWithWhereUniqueWithoutVentaInput[]
    createMany?: DetalleVentaCreateManyVentaInputEnvelope
    set?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    disconnect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    delete?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    connect?: DetalleVentaWhereUniqueInput | DetalleVentaWhereUniqueInput[]
    update?: DetalleVentaUpdateWithWhereUniqueWithoutVentaInput | DetalleVentaUpdateWithWhereUniqueWithoutVentaInput[]
    updateMany?: DetalleVentaUpdateManyWithWhereWithoutVentaInput | DetalleVentaUpdateManyWithWhereWithoutVentaInput[]
    deleteMany?: DetalleVentaScalarWhereInput | DetalleVentaScalarWhereInput[]
  }

  export type VentaCreateNestedOneWithoutDetallesInput = {
    create?: XOR<VentaCreateWithoutDetallesInput, VentaUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: VentaCreateOrConnectWithoutDetallesInput
    connect?: VentaWhereUniqueInput
  }

  export type ProductoCreateNestedOneWithoutDetallesVentaInput = {
    create?: XOR<ProductoCreateWithoutDetallesVentaInput, ProductoUncheckedCreateWithoutDetallesVentaInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutDetallesVentaInput
    connect?: ProductoWhereUniqueInput
  }

  export type VentaUpdateOneRequiredWithoutDetallesNestedInput = {
    create?: XOR<VentaCreateWithoutDetallesInput, VentaUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: VentaCreateOrConnectWithoutDetallesInput
    upsert?: VentaUpsertWithoutDetallesInput
    connect?: VentaWhereUniqueInput
    update?: XOR<XOR<VentaUpdateToOneWithWhereWithoutDetallesInput, VentaUpdateWithoutDetallesInput>, VentaUncheckedUpdateWithoutDetallesInput>
  }

  export type ProductoUpdateOneRequiredWithoutDetallesVentaNestedInput = {
    create?: XOR<ProductoCreateWithoutDetallesVentaInput, ProductoUncheckedCreateWithoutDetallesVentaInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutDetallesVentaInput
    upsert?: ProductoUpsertWithoutDetallesVentaInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutDetallesVentaInput, ProductoUpdateWithoutDetallesVentaInput>, ProductoUncheckedUpdateWithoutDetallesVentaInput>
  }

  export type ProductoCreateNestedOneWithoutEntradasMercaderiaInput = {
    create?: XOR<ProductoCreateWithoutEntradasMercaderiaInput, ProductoUncheckedCreateWithoutEntradasMercaderiaInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutEntradasMercaderiaInput
    connect?: ProductoWhereUniqueInput
  }

  export type ProveedorCreateNestedOneWithoutEntradasMercaderiaInput = {
    create?: XOR<ProveedorCreateWithoutEntradasMercaderiaInput, ProveedorUncheckedCreateWithoutEntradasMercaderiaInput>
    connectOrCreate?: ProveedorCreateOrConnectWithoutEntradasMercaderiaInput
    connect?: ProveedorWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutEntradasMercaderiaInput = {
    create?: XOR<UsuarioCreateWithoutEntradasMercaderiaInput, UsuarioUncheckedCreateWithoutEntradasMercaderiaInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutEntradasMercaderiaInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ProductoUpdateOneRequiredWithoutEntradasMercaderiaNestedInput = {
    create?: XOR<ProductoCreateWithoutEntradasMercaderiaInput, ProductoUncheckedCreateWithoutEntradasMercaderiaInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutEntradasMercaderiaInput
    upsert?: ProductoUpsertWithoutEntradasMercaderiaInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutEntradasMercaderiaInput, ProductoUpdateWithoutEntradasMercaderiaInput>, ProductoUncheckedUpdateWithoutEntradasMercaderiaInput>
  }

  export type ProveedorUpdateOneRequiredWithoutEntradasMercaderiaNestedInput = {
    create?: XOR<ProveedorCreateWithoutEntradasMercaderiaInput, ProveedorUncheckedCreateWithoutEntradasMercaderiaInput>
    connectOrCreate?: ProveedorCreateOrConnectWithoutEntradasMercaderiaInput
    upsert?: ProveedorUpsertWithoutEntradasMercaderiaInput
    connect?: ProveedorWhereUniqueInput
    update?: XOR<XOR<ProveedorUpdateToOneWithWhereWithoutEntradasMercaderiaInput, ProveedorUpdateWithoutEntradasMercaderiaInput>, ProveedorUncheckedUpdateWithoutEntradasMercaderiaInput>
  }

  export type UsuarioUpdateOneRequiredWithoutEntradasMercaderiaNestedInput = {
    create?: XOR<UsuarioCreateWithoutEntradasMercaderiaInput, UsuarioUncheckedCreateWithoutEntradasMercaderiaInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutEntradasMercaderiaInput
    upsert?: UsuarioUpsertWithoutEntradasMercaderiaInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutEntradasMercaderiaInput, UsuarioUpdateWithoutEntradasMercaderiaInput>, UsuarioUncheckedUpdateWithoutEntradasMercaderiaInput>
  }

  export type ProductoCreateNestedOneWithoutBajasInput = {
    create?: XOR<ProductoCreateWithoutBajasInput, ProductoUncheckedCreateWithoutBajasInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutBajasInput
    connect?: ProductoWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutBajasInput = {
    create?: XOR<UsuarioCreateWithoutBajasInput, UsuarioUncheckedCreateWithoutBajasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutBajasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ProductoUpdateOneRequiredWithoutBajasNestedInput = {
    create?: XOR<ProductoCreateWithoutBajasInput, ProductoUncheckedCreateWithoutBajasInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutBajasInput
    upsert?: ProductoUpsertWithoutBajasInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutBajasInput, ProductoUpdateWithoutBajasInput>, ProductoUncheckedUpdateWithoutBajasInput>
  }

  export type UsuarioUpdateOneRequiredWithoutBajasNestedInput = {
    create?: XOR<UsuarioCreateWithoutBajasInput, UsuarioUncheckedCreateWithoutBajasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutBajasInput
    upsert?: UsuarioUpsertWithoutBajasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutBajasInput, UsuarioUpdateWithoutBajasInput>, UsuarioUncheckedUpdateWithoutBajasInput>
  }

  export type ProductoCreateNestedOneWithoutSolicitudesInput = {
    create?: XOR<ProductoCreateWithoutSolicitudesInput, ProductoUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutSolicitudesInput
    connect?: ProductoWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutSolicitudesInput = {
    create?: XOR<UsuarioCreateWithoutSolicitudesInput, UsuarioUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutSolicitudesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ProveedorCreateNestedOneWithoutSolicitudesInput = {
    create?: XOR<ProveedorCreateWithoutSolicitudesInput, ProveedorUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: ProveedorCreateOrConnectWithoutSolicitudesInput
    connect?: ProveedorWhereUniqueInput
  }

  export type ProductoUpdateOneRequiredWithoutSolicitudesNestedInput = {
    create?: XOR<ProductoCreateWithoutSolicitudesInput, ProductoUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutSolicitudesInput
    upsert?: ProductoUpsertWithoutSolicitudesInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutSolicitudesInput, ProductoUpdateWithoutSolicitudesInput>, ProductoUncheckedUpdateWithoutSolicitudesInput>
  }

  export type UsuarioUpdateOneRequiredWithoutSolicitudesNestedInput = {
    create?: XOR<UsuarioCreateWithoutSolicitudesInput, UsuarioUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutSolicitudesInput
    upsert?: UsuarioUpsertWithoutSolicitudesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutSolicitudesInput, UsuarioUpdateWithoutSolicitudesInput>, UsuarioUncheckedUpdateWithoutSolicitudesInput>
  }

  export type ProveedorUpdateOneWithoutSolicitudesNestedInput = {
    create?: XOR<ProveedorCreateWithoutSolicitudesInput, ProveedorUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: ProveedorCreateOrConnectWithoutSolicitudesInput
    upsert?: ProveedorUpsertWithoutSolicitudesInput
    disconnect?: ProveedorWhereInput | boolean
    delete?: ProveedorWhereInput | boolean
    connect?: ProveedorWhereUniqueInput
    update?: XOR<XOR<ProveedorUpdateToOneWithWhereWithoutSolicitudesInput, ProveedorUpdateWithoutSolicitudesInput>, ProveedorUncheckedUpdateWithoutSolicitudesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type LogAccesoCreateWithoutUsuarioInput = {
    rol: string
    timestamp?: Date | string
    archivado?: boolean
  }

  export type LogAccesoUncheckedCreateWithoutUsuarioInput = {
    id?: number
    rol: string
    timestamp?: Date | string
    archivado?: boolean
  }

  export type LogAccesoCreateOrConnectWithoutUsuarioInput = {
    where: LogAccesoWhereUniqueInput
    create: XOR<LogAccesoCreateWithoutUsuarioInput, LogAccesoUncheckedCreateWithoutUsuarioInput>
  }

  export type LogAccesoCreateManyUsuarioInputEnvelope = {
    data: LogAccesoCreateManyUsuarioInput | LogAccesoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type VentaCreateWithoutUsuarioInput = {
    numero: string
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
    detalles?: DetalleVentaCreateNestedManyWithoutVentaInput
    cliente?: ClienteCreateNestedOneWithoutVentasInput
  }

  export type VentaUncheckedCreateWithoutUsuarioInput = {
    id?: number
    numero: string
    clienteId?: number | null
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
    detalles?: DetalleVentaUncheckedCreateNestedManyWithoutVentaInput
  }

  export type VentaCreateOrConnectWithoutUsuarioInput = {
    where: VentaWhereUniqueInput
    create: XOR<VentaCreateWithoutUsuarioInput, VentaUncheckedCreateWithoutUsuarioInput>
  }

  export type VentaCreateManyUsuarioInputEnvelope = {
    data: VentaCreateManyUsuarioInput | VentaCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type EntradaMercaderiaCreateWithoutUsuarioInput = {
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    creadoEn?: Date | string
    producto: ProductoCreateNestedOneWithoutEntradasMercaderiaInput
    proveedor: ProveedorCreateNestedOneWithoutEntradasMercaderiaInput
  }

  export type EntradaMercaderiaUncheckedCreateWithoutUsuarioInput = {
    id?: number
    productoId: number
    proveedorId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    creadoEn?: Date | string
  }

  export type EntradaMercaderiaCreateOrConnectWithoutUsuarioInput = {
    where: EntradaMercaderiaWhereUniqueInput
    create: XOR<EntradaMercaderiaCreateWithoutUsuarioInput, EntradaMercaderiaUncheckedCreateWithoutUsuarioInput>
  }

  export type EntradaMercaderiaCreateManyUsuarioInputEnvelope = {
    data: EntradaMercaderiaCreateManyUsuarioInput | EntradaMercaderiaCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type BajaInventarioCreateWithoutUsuarioInput = {
    cantidad: number
    motivo: string
    creadoEn?: Date | string
    producto: ProductoCreateNestedOneWithoutBajasInput
  }

  export type BajaInventarioUncheckedCreateWithoutUsuarioInput = {
    id?: number
    productoId: number
    cantidad: number
    motivo: string
    creadoEn?: Date | string
  }

  export type BajaInventarioCreateOrConnectWithoutUsuarioInput = {
    where: BajaInventarioWhereUniqueInput
    create: XOR<BajaInventarioCreateWithoutUsuarioInput, BajaInventarioUncheckedCreateWithoutUsuarioInput>
  }

  export type BajaInventarioCreateManyUsuarioInputEnvelope = {
    data: BajaInventarioCreateManyUsuarioInput | BajaInventarioCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type SolicitudReposicionCreateWithoutUsuarioInput = {
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
    producto: ProductoCreateNestedOneWithoutSolicitudesInput
    proveedor?: ProveedorCreateNestedOneWithoutSolicitudesInput
  }

  export type SolicitudReposicionUncheckedCreateWithoutUsuarioInput = {
    id?: number
    productoId: number
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    proveedorId?: number | null
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
  }

  export type SolicitudReposicionCreateOrConnectWithoutUsuarioInput = {
    where: SolicitudReposicionWhereUniqueInput
    create: XOR<SolicitudReposicionCreateWithoutUsuarioInput, SolicitudReposicionUncheckedCreateWithoutUsuarioInput>
  }

  export type SolicitudReposicionCreateManyUsuarioInputEnvelope = {
    data: SolicitudReposicionCreateManyUsuarioInput | SolicitudReposicionCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type LogAccesoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: LogAccesoWhereUniqueInput
    update: XOR<LogAccesoUpdateWithoutUsuarioInput, LogAccesoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<LogAccesoCreateWithoutUsuarioInput, LogAccesoUncheckedCreateWithoutUsuarioInput>
  }

  export type LogAccesoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: LogAccesoWhereUniqueInput
    data: XOR<LogAccesoUpdateWithoutUsuarioInput, LogAccesoUncheckedUpdateWithoutUsuarioInput>
  }

  export type LogAccesoUpdateManyWithWhereWithoutUsuarioInput = {
    where: LogAccesoScalarWhereInput
    data: XOR<LogAccesoUpdateManyMutationInput, LogAccesoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type LogAccesoScalarWhereInput = {
    AND?: LogAccesoScalarWhereInput | LogAccesoScalarWhereInput[]
    OR?: LogAccesoScalarWhereInput[]
    NOT?: LogAccesoScalarWhereInput | LogAccesoScalarWhereInput[]
    id?: IntFilter<"LogAcceso"> | number
    usuarioId?: IntFilter<"LogAcceso"> | number
    rol?: StringFilter<"LogAcceso"> | string
    timestamp?: DateTimeFilter<"LogAcceso"> | Date | string
    archivado?: BoolFilter<"LogAcceso"> | boolean
  }

  export type VentaUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: VentaWhereUniqueInput
    update: XOR<VentaUpdateWithoutUsuarioInput, VentaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<VentaCreateWithoutUsuarioInput, VentaUncheckedCreateWithoutUsuarioInput>
  }

  export type VentaUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: VentaWhereUniqueInput
    data: XOR<VentaUpdateWithoutUsuarioInput, VentaUncheckedUpdateWithoutUsuarioInput>
  }

  export type VentaUpdateManyWithWhereWithoutUsuarioInput = {
    where: VentaScalarWhereInput
    data: XOR<VentaUpdateManyMutationInput, VentaUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type VentaScalarWhereInput = {
    AND?: VentaScalarWhereInput | VentaScalarWhereInput[]
    OR?: VentaScalarWhereInput[]
    NOT?: VentaScalarWhereInput | VentaScalarWhereInput[]
    id?: IntFilter<"Venta"> | number
    numero?: StringFilter<"Venta"> | string
    usuarioId?: IntFilter<"Venta"> | number
    clienteId?: IntNullableFilter<"Venta"> | number | null
    subtotal?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    igv?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    total?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFilter<"Venta"> | string
    montoRecibido?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFilter<"Venta"> | Decimal | DecimalJsLike | number | string
    estado?: StringFilter<"Venta"> | string
    creadoEn?: DateTimeFilter<"Venta"> | Date | string
  }

  export type EntradaMercaderiaUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: EntradaMercaderiaWhereUniqueInput
    update: XOR<EntradaMercaderiaUpdateWithoutUsuarioInput, EntradaMercaderiaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<EntradaMercaderiaCreateWithoutUsuarioInput, EntradaMercaderiaUncheckedCreateWithoutUsuarioInput>
  }

  export type EntradaMercaderiaUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: EntradaMercaderiaWhereUniqueInput
    data: XOR<EntradaMercaderiaUpdateWithoutUsuarioInput, EntradaMercaderiaUncheckedUpdateWithoutUsuarioInput>
  }

  export type EntradaMercaderiaUpdateManyWithWhereWithoutUsuarioInput = {
    where: EntradaMercaderiaScalarWhereInput
    data: XOR<EntradaMercaderiaUpdateManyMutationInput, EntradaMercaderiaUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type EntradaMercaderiaScalarWhereInput = {
    AND?: EntradaMercaderiaScalarWhereInput | EntradaMercaderiaScalarWhereInput[]
    OR?: EntradaMercaderiaScalarWhereInput[]
    NOT?: EntradaMercaderiaScalarWhereInput | EntradaMercaderiaScalarWhereInput[]
    id?: IntFilter<"EntradaMercaderia"> | number
    productoId?: IntFilter<"EntradaMercaderia"> | number
    proveedorId?: IntFilter<"EntradaMercaderia"> | number
    cantidad?: IntFilter<"EntradaMercaderia"> | number
    precioUnitario?: DecimalFilter<"EntradaMercaderia"> | Decimal | DecimalJsLike | number | string
    usuarioId?: IntFilter<"EntradaMercaderia"> | number
    creadoEn?: DateTimeFilter<"EntradaMercaderia"> | Date | string
  }

  export type BajaInventarioUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: BajaInventarioWhereUniqueInput
    update: XOR<BajaInventarioUpdateWithoutUsuarioInput, BajaInventarioUncheckedUpdateWithoutUsuarioInput>
    create: XOR<BajaInventarioCreateWithoutUsuarioInput, BajaInventarioUncheckedCreateWithoutUsuarioInput>
  }

  export type BajaInventarioUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: BajaInventarioWhereUniqueInput
    data: XOR<BajaInventarioUpdateWithoutUsuarioInput, BajaInventarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type BajaInventarioUpdateManyWithWhereWithoutUsuarioInput = {
    where: BajaInventarioScalarWhereInput
    data: XOR<BajaInventarioUpdateManyMutationInput, BajaInventarioUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type BajaInventarioScalarWhereInput = {
    AND?: BajaInventarioScalarWhereInput | BajaInventarioScalarWhereInput[]
    OR?: BajaInventarioScalarWhereInput[]
    NOT?: BajaInventarioScalarWhereInput | BajaInventarioScalarWhereInput[]
    id?: IntFilter<"BajaInventario"> | number
    productoId?: IntFilter<"BajaInventario"> | number
    cantidad?: IntFilter<"BajaInventario"> | number
    motivo?: StringFilter<"BajaInventario"> | string
    usuarioId?: IntFilter<"BajaInventario"> | number
    creadoEn?: DateTimeFilter<"BajaInventario"> | Date | string
  }

  export type SolicitudReposicionUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: SolicitudReposicionWhereUniqueInput
    update: XOR<SolicitudReposicionUpdateWithoutUsuarioInput, SolicitudReposicionUncheckedUpdateWithoutUsuarioInput>
    create: XOR<SolicitudReposicionCreateWithoutUsuarioInput, SolicitudReposicionUncheckedCreateWithoutUsuarioInput>
  }

  export type SolicitudReposicionUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: SolicitudReposicionWhereUniqueInput
    data: XOR<SolicitudReposicionUpdateWithoutUsuarioInput, SolicitudReposicionUncheckedUpdateWithoutUsuarioInput>
  }

  export type SolicitudReposicionUpdateManyWithWhereWithoutUsuarioInput = {
    where: SolicitudReposicionScalarWhereInput
    data: XOR<SolicitudReposicionUpdateManyMutationInput, SolicitudReposicionUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type SolicitudReposicionScalarWhereInput = {
    AND?: SolicitudReposicionScalarWhereInput | SolicitudReposicionScalarWhereInput[]
    OR?: SolicitudReposicionScalarWhereInput[]
    NOT?: SolicitudReposicionScalarWhereInput | SolicitudReposicionScalarWhereInput[]
    id?: IntFilter<"SolicitudReposicion"> | number
    productoId?: IntFilter<"SolicitudReposicion"> | number
    cantidadActual?: IntFilter<"SolicitudReposicion"> | number
    cantidadSolicitada?: IntFilter<"SolicitudReposicion"> | number
    estado?: StringFilter<"SolicitudReposicion"> | string
    usuarioId?: IntFilter<"SolicitudReposicion"> | number
    proveedorId?: IntNullableFilter<"SolicitudReposicion"> | number | null
    fechaEstimada?: DateTimeNullableFilter<"SolicitudReposicion"> | Date | string | null
    notaRechazo?: StringNullableFilter<"SolicitudReposicion"> | string | null
    creadoEn?: DateTimeFilter<"SolicitudReposicion"> | Date | string
  }

  export type UsuarioCreateWithoutLogAccesosInput = {
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    ventas?: VentaCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutLogAccesosInput = {
    id?: number
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    ventas?: VentaUncheckedCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutLogAccesosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutLogAccesosInput, UsuarioUncheckedCreateWithoutLogAccesosInput>
  }

  export type UsuarioUpsertWithoutLogAccesosInput = {
    update: XOR<UsuarioUpdateWithoutLogAccesosInput, UsuarioUncheckedUpdateWithoutLogAccesosInput>
    create: XOR<UsuarioCreateWithoutLogAccesosInput, UsuarioUncheckedCreateWithoutLogAccesosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutLogAccesosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutLogAccesosInput, UsuarioUncheckedUpdateWithoutLogAccesosInput>
  }

  export type UsuarioUpdateWithoutLogAccesosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    ventas?: VentaUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutLogAccesosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    ventas?: VentaUncheckedUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type ProductoCreateWithoutCategoriaInput = {
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    creadoEn?: Date | string
    detallesVenta?: DetalleVentaCreateNestedManyWithoutProductoInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutCategoriaInput = {
    id?: number
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    creadoEn?: Date | string
    detallesVenta?: DetalleVentaUncheckedCreateNestedManyWithoutProductoInput
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutCategoriaInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput>
  }

  export type ProductoCreateManyCategoriaInputEnvelope = {
    data: ProductoCreateManyCategoriaInput | ProductoCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type ProductoUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: ProductoWhereUniqueInput
    update: XOR<ProductoUpdateWithoutCategoriaInput, ProductoUncheckedUpdateWithoutCategoriaInput>
    create: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput>
  }

  export type ProductoUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: ProductoWhereUniqueInput
    data: XOR<ProductoUpdateWithoutCategoriaInput, ProductoUncheckedUpdateWithoutCategoriaInput>
  }

  export type ProductoUpdateManyWithWhereWithoutCategoriaInput = {
    where: ProductoScalarWhereInput
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type ProductoScalarWhereInput = {
    AND?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
    OR?: ProductoScalarWhereInput[]
    NOT?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
    id?: IntFilter<"Producto"> | number
    nombre?: StringFilter<"Producto"> | string
    marca?: StringFilter<"Producto"> | string
    precio?: DecimalFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Producto"> | number
    fechaVencimiento?: DateTimeNullableFilter<"Producto"> | Date | string | null
    activo?: BoolFilter<"Producto"> | boolean
    categoriaId?: IntFilter<"Producto"> | number
    creadoEn?: DateTimeFilter<"Producto"> | Date | string
  }

  export type CategoriaCreateWithoutProductosInput = {
    nombre: string
  }

  export type CategoriaUncheckedCreateWithoutProductosInput = {
    id?: number
    nombre: string
  }

  export type CategoriaCreateOrConnectWithoutProductosInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
  }

  export type DetalleVentaCreateWithoutProductoInput = {
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    venta: VentaCreateNestedOneWithoutDetallesInput
  }

  export type DetalleVentaUncheckedCreateWithoutProductoInput = {
    id?: number
    ventaId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type DetalleVentaCreateOrConnectWithoutProductoInput = {
    where: DetalleVentaWhereUniqueInput
    create: XOR<DetalleVentaCreateWithoutProductoInput, DetalleVentaUncheckedCreateWithoutProductoInput>
  }

  export type DetalleVentaCreateManyProductoInputEnvelope = {
    data: DetalleVentaCreateManyProductoInput | DetalleVentaCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type EntradaMercaderiaCreateWithoutProductoInput = {
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    creadoEn?: Date | string
    proveedor: ProveedorCreateNestedOneWithoutEntradasMercaderiaInput
    usuario: UsuarioCreateNestedOneWithoutEntradasMercaderiaInput
  }

  export type EntradaMercaderiaUncheckedCreateWithoutProductoInput = {
    id?: number
    proveedorId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type EntradaMercaderiaCreateOrConnectWithoutProductoInput = {
    where: EntradaMercaderiaWhereUniqueInput
    create: XOR<EntradaMercaderiaCreateWithoutProductoInput, EntradaMercaderiaUncheckedCreateWithoutProductoInput>
  }

  export type EntradaMercaderiaCreateManyProductoInputEnvelope = {
    data: EntradaMercaderiaCreateManyProductoInput | EntradaMercaderiaCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type BajaInventarioCreateWithoutProductoInput = {
    cantidad: number
    motivo: string
    creadoEn?: Date | string
    usuario: UsuarioCreateNestedOneWithoutBajasInput
  }

  export type BajaInventarioUncheckedCreateWithoutProductoInput = {
    id?: number
    cantidad: number
    motivo: string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type BajaInventarioCreateOrConnectWithoutProductoInput = {
    where: BajaInventarioWhereUniqueInput
    create: XOR<BajaInventarioCreateWithoutProductoInput, BajaInventarioUncheckedCreateWithoutProductoInput>
  }

  export type BajaInventarioCreateManyProductoInputEnvelope = {
    data: BajaInventarioCreateManyProductoInput | BajaInventarioCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type SolicitudReposicionCreateWithoutProductoInput = {
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
    usuario: UsuarioCreateNestedOneWithoutSolicitudesInput
    proveedor?: ProveedorCreateNestedOneWithoutSolicitudesInput
  }

  export type SolicitudReposicionUncheckedCreateWithoutProductoInput = {
    id?: number
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    usuarioId: number
    proveedorId?: number | null
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
  }

  export type SolicitudReposicionCreateOrConnectWithoutProductoInput = {
    where: SolicitudReposicionWhereUniqueInput
    create: XOR<SolicitudReposicionCreateWithoutProductoInput, SolicitudReposicionUncheckedCreateWithoutProductoInput>
  }

  export type SolicitudReposicionCreateManyProductoInputEnvelope = {
    data: SolicitudReposicionCreateManyProductoInput | SolicitudReposicionCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type CategoriaUpsertWithoutProductosInput = {
    update: XOR<CategoriaUpdateWithoutProductosInput, CategoriaUncheckedUpdateWithoutProductosInput>
    create: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutProductosInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutProductosInput, CategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type CategoriaUpdateWithoutProductosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriaUncheckedUpdateWithoutProductosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type DetalleVentaUpsertWithWhereUniqueWithoutProductoInput = {
    where: DetalleVentaWhereUniqueInput
    update: XOR<DetalleVentaUpdateWithoutProductoInput, DetalleVentaUncheckedUpdateWithoutProductoInput>
    create: XOR<DetalleVentaCreateWithoutProductoInput, DetalleVentaUncheckedCreateWithoutProductoInput>
  }

  export type DetalleVentaUpdateWithWhereUniqueWithoutProductoInput = {
    where: DetalleVentaWhereUniqueInput
    data: XOR<DetalleVentaUpdateWithoutProductoInput, DetalleVentaUncheckedUpdateWithoutProductoInput>
  }

  export type DetalleVentaUpdateManyWithWhereWithoutProductoInput = {
    where: DetalleVentaScalarWhereInput
    data: XOR<DetalleVentaUpdateManyMutationInput, DetalleVentaUncheckedUpdateManyWithoutProductoInput>
  }

  export type DetalleVentaScalarWhereInput = {
    AND?: DetalleVentaScalarWhereInput | DetalleVentaScalarWhereInput[]
    OR?: DetalleVentaScalarWhereInput[]
    NOT?: DetalleVentaScalarWhereInput | DetalleVentaScalarWhereInput[]
    id?: IntFilter<"DetalleVenta"> | number
    ventaId?: IntFilter<"DetalleVenta"> | number
    productoId?: IntFilter<"DetalleVenta"> | number
    cantidad?: IntFilter<"DetalleVenta"> | number
    precioUnitario?: DecimalFilter<"DetalleVenta"> | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFilter<"DetalleVenta"> | Decimal | DecimalJsLike | number | string
  }

  export type EntradaMercaderiaUpsertWithWhereUniqueWithoutProductoInput = {
    where: EntradaMercaderiaWhereUniqueInput
    update: XOR<EntradaMercaderiaUpdateWithoutProductoInput, EntradaMercaderiaUncheckedUpdateWithoutProductoInput>
    create: XOR<EntradaMercaderiaCreateWithoutProductoInput, EntradaMercaderiaUncheckedCreateWithoutProductoInput>
  }

  export type EntradaMercaderiaUpdateWithWhereUniqueWithoutProductoInput = {
    where: EntradaMercaderiaWhereUniqueInput
    data: XOR<EntradaMercaderiaUpdateWithoutProductoInput, EntradaMercaderiaUncheckedUpdateWithoutProductoInput>
  }

  export type EntradaMercaderiaUpdateManyWithWhereWithoutProductoInput = {
    where: EntradaMercaderiaScalarWhereInput
    data: XOR<EntradaMercaderiaUpdateManyMutationInput, EntradaMercaderiaUncheckedUpdateManyWithoutProductoInput>
  }

  export type BajaInventarioUpsertWithWhereUniqueWithoutProductoInput = {
    where: BajaInventarioWhereUniqueInput
    update: XOR<BajaInventarioUpdateWithoutProductoInput, BajaInventarioUncheckedUpdateWithoutProductoInput>
    create: XOR<BajaInventarioCreateWithoutProductoInput, BajaInventarioUncheckedCreateWithoutProductoInput>
  }

  export type BajaInventarioUpdateWithWhereUniqueWithoutProductoInput = {
    where: BajaInventarioWhereUniqueInput
    data: XOR<BajaInventarioUpdateWithoutProductoInput, BajaInventarioUncheckedUpdateWithoutProductoInput>
  }

  export type BajaInventarioUpdateManyWithWhereWithoutProductoInput = {
    where: BajaInventarioScalarWhereInput
    data: XOR<BajaInventarioUpdateManyMutationInput, BajaInventarioUncheckedUpdateManyWithoutProductoInput>
  }

  export type SolicitudReposicionUpsertWithWhereUniqueWithoutProductoInput = {
    where: SolicitudReposicionWhereUniqueInput
    update: XOR<SolicitudReposicionUpdateWithoutProductoInput, SolicitudReposicionUncheckedUpdateWithoutProductoInput>
    create: XOR<SolicitudReposicionCreateWithoutProductoInput, SolicitudReposicionUncheckedCreateWithoutProductoInput>
  }

  export type SolicitudReposicionUpdateWithWhereUniqueWithoutProductoInput = {
    where: SolicitudReposicionWhereUniqueInput
    data: XOR<SolicitudReposicionUpdateWithoutProductoInput, SolicitudReposicionUncheckedUpdateWithoutProductoInput>
  }

  export type SolicitudReposicionUpdateManyWithWhereWithoutProductoInput = {
    where: SolicitudReposicionScalarWhereInput
    data: XOR<SolicitudReposicionUpdateManyMutationInput, SolicitudReposicionUncheckedUpdateManyWithoutProductoInput>
  }

  export type EntradaMercaderiaCreateWithoutProveedorInput = {
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    creadoEn?: Date | string
    producto: ProductoCreateNestedOneWithoutEntradasMercaderiaInput
    usuario: UsuarioCreateNestedOneWithoutEntradasMercaderiaInput
  }

  export type EntradaMercaderiaUncheckedCreateWithoutProveedorInput = {
    id?: number
    productoId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type EntradaMercaderiaCreateOrConnectWithoutProveedorInput = {
    where: EntradaMercaderiaWhereUniqueInput
    create: XOR<EntradaMercaderiaCreateWithoutProveedorInput, EntradaMercaderiaUncheckedCreateWithoutProveedorInput>
  }

  export type EntradaMercaderiaCreateManyProveedorInputEnvelope = {
    data: EntradaMercaderiaCreateManyProveedorInput | EntradaMercaderiaCreateManyProveedorInput[]
    skipDuplicates?: boolean
  }

  export type SolicitudReposicionCreateWithoutProveedorInput = {
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
    producto: ProductoCreateNestedOneWithoutSolicitudesInput
    usuario: UsuarioCreateNestedOneWithoutSolicitudesInput
  }

  export type SolicitudReposicionUncheckedCreateWithoutProveedorInput = {
    id?: number
    productoId: number
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    usuarioId: number
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
  }

  export type SolicitudReposicionCreateOrConnectWithoutProveedorInput = {
    where: SolicitudReposicionWhereUniqueInput
    create: XOR<SolicitudReposicionCreateWithoutProveedorInput, SolicitudReposicionUncheckedCreateWithoutProveedorInput>
  }

  export type SolicitudReposicionCreateManyProveedorInputEnvelope = {
    data: SolicitudReposicionCreateManyProveedorInput | SolicitudReposicionCreateManyProveedorInput[]
    skipDuplicates?: boolean
  }

  export type EntradaMercaderiaUpsertWithWhereUniqueWithoutProveedorInput = {
    where: EntradaMercaderiaWhereUniqueInput
    update: XOR<EntradaMercaderiaUpdateWithoutProveedorInput, EntradaMercaderiaUncheckedUpdateWithoutProveedorInput>
    create: XOR<EntradaMercaderiaCreateWithoutProveedorInput, EntradaMercaderiaUncheckedCreateWithoutProveedorInput>
  }

  export type EntradaMercaderiaUpdateWithWhereUniqueWithoutProveedorInput = {
    where: EntradaMercaderiaWhereUniqueInput
    data: XOR<EntradaMercaderiaUpdateWithoutProveedorInput, EntradaMercaderiaUncheckedUpdateWithoutProveedorInput>
  }

  export type EntradaMercaderiaUpdateManyWithWhereWithoutProveedorInput = {
    where: EntradaMercaderiaScalarWhereInput
    data: XOR<EntradaMercaderiaUpdateManyMutationInput, EntradaMercaderiaUncheckedUpdateManyWithoutProveedorInput>
  }

  export type SolicitudReposicionUpsertWithWhereUniqueWithoutProveedorInput = {
    where: SolicitudReposicionWhereUniqueInput
    update: XOR<SolicitudReposicionUpdateWithoutProveedorInput, SolicitudReposicionUncheckedUpdateWithoutProveedorInput>
    create: XOR<SolicitudReposicionCreateWithoutProveedorInput, SolicitudReposicionUncheckedCreateWithoutProveedorInput>
  }

  export type SolicitudReposicionUpdateWithWhereUniqueWithoutProveedorInput = {
    where: SolicitudReposicionWhereUniqueInput
    data: XOR<SolicitudReposicionUpdateWithoutProveedorInput, SolicitudReposicionUncheckedUpdateWithoutProveedorInput>
  }

  export type SolicitudReposicionUpdateManyWithWhereWithoutProveedorInput = {
    where: SolicitudReposicionScalarWhereInput
    data: XOR<SolicitudReposicionUpdateManyMutationInput, SolicitudReposicionUncheckedUpdateManyWithoutProveedorInput>
  }

  export type VentaCreateWithoutClienteInput = {
    numero: string
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
    detalles?: DetalleVentaCreateNestedManyWithoutVentaInput
    usuario: UsuarioCreateNestedOneWithoutVentasInput
  }

  export type VentaUncheckedCreateWithoutClienteInput = {
    id?: number
    numero: string
    usuarioId: number
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
    detalles?: DetalleVentaUncheckedCreateNestedManyWithoutVentaInput
  }

  export type VentaCreateOrConnectWithoutClienteInput = {
    where: VentaWhereUniqueInput
    create: XOR<VentaCreateWithoutClienteInput, VentaUncheckedCreateWithoutClienteInput>
  }

  export type VentaCreateManyClienteInputEnvelope = {
    data: VentaCreateManyClienteInput | VentaCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type VentaUpsertWithWhereUniqueWithoutClienteInput = {
    where: VentaWhereUniqueInput
    update: XOR<VentaUpdateWithoutClienteInput, VentaUncheckedUpdateWithoutClienteInput>
    create: XOR<VentaCreateWithoutClienteInput, VentaUncheckedCreateWithoutClienteInput>
  }

  export type VentaUpdateWithWhereUniqueWithoutClienteInput = {
    where: VentaWhereUniqueInput
    data: XOR<VentaUpdateWithoutClienteInput, VentaUncheckedUpdateWithoutClienteInput>
  }

  export type VentaUpdateManyWithWhereWithoutClienteInput = {
    where: VentaScalarWhereInput
    data: XOR<VentaUpdateManyMutationInput, VentaUncheckedUpdateManyWithoutClienteInput>
  }

  export type DetalleVentaCreateWithoutVentaInput = {
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
    producto: ProductoCreateNestedOneWithoutDetallesVentaInput
  }

  export type DetalleVentaUncheckedCreateWithoutVentaInput = {
    id?: number
    productoId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type DetalleVentaCreateOrConnectWithoutVentaInput = {
    where: DetalleVentaWhereUniqueInput
    create: XOR<DetalleVentaCreateWithoutVentaInput, DetalleVentaUncheckedCreateWithoutVentaInput>
  }

  export type DetalleVentaCreateManyVentaInputEnvelope = {
    data: DetalleVentaCreateManyVentaInput | DetalleVentaCreateManyVentaInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioCreateWithoutVentasInput = {
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutVentasInput = {
    id?: number
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoUncheckedCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutVentasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutVentasInput, UsuarioUncheckedCreateWithoutVentasInput>
  }

  export type ClienteCreateWithoutVentasInput = {
    dni: string
    nombre: string
    email?: string | null
    telefono?: string | null
    activo?: boolean
    creadoEn?: Date | string
  }

  export type ClienteUncheckedCreateWithoutVentasInput = {
    id?: number
    dni: string
    nombre: string
    email?: string | null
    telefono?: string | null
    activo?: boolean
    creadoEn?: Date | string
  }

  export type ClienteCreateOrConnectWithoutVentasInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutVentasInput, ClienteUncheckedCreateWithoutVentasInput>
  }

  export type DetalleVentaUpsertWithWhereUniqueWithoutVentaInput = {
    where: DetalleVentaWhereUniqueInput
    update: XOR<DetalleVentaUpdateWithoutVentaInput, DetalleVentaUncheckedUpdateWithoutVentaInput>
    create: XOR<DetalleVentaCreateWithoutVentaInput, DetalleVentaUncheckedCreateWithoutVentaInput>
  }

  export type DetalleVentaUpdateWithWhereUniqueWithoutVentaInput = {
    where: DetalleVentaWhereUniqueInput
    data: XOR<DetalleVentaUpdateWithoutVentaInput, DetalleVentaUncheckedUpdateWithoutVentaInput>
  }

  export type DetalleVentaUpdateManyWithWhereWithoutVentaInput = {
    where: DetalleVentaScalarWhereInput
    data: XOR<DetalleVentaUpdateManyMutationInput, DetalleVentaUncheckedUpdateManyWithoutVentaInput>
  }

  export type UsuarioUpsertWithoutVentasInput = {
    update: XOR<UsuarioUpdateWithoutVentasInput, UsuarioUncheckedUpdateWithoutVentasInput>
    create: XOR<UsuarioCreateWithoutVentasInput, UsuarioUncheckedCreateWithoutVentasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutVentasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutVentasInput, UsuarioUncheckedUpdateWithoutVentasInput>
  }

  export type UsuarioUpdateWithoutVentasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutVentasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUncheckedUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type ClienteUpsertWithoutVentasInput = {
    update: XOR<ClienteUpdateWithoutVentasInput, ClienteUncheckedUpdateWithoutVentasInput>
    create: XOR<ClienteCreateWithoutVentasInput, ClienteUncheckedCreateWithoutVentasInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutVentasInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutVentasInput, ClienteUncheckedUpdateWithoutVentasInput>
  }

  export type ClienteUpdateWithoutVentasInput = {
    dni?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateWithoutVentasInput = {
    id?: IntFieldUpdateOperationsInput | number
    dni?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VentaCreateWithoutDetallesInput = {
    numero: string
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
    usuario: UsuarioCreateNestedOneWithoutVentasInput
    cliente?: ClienteCreateNestedOneWithoutVentasInput
  }

  export type VentaUncheckedCreateWithoutDetallesInput = {
    id?: number
    numero: string
    usuarioId: number
    clienteId?: number | null
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
  }

  export type VentaCreateOrConnectWithoutDetallesInput = {
    where: VentaWhereUniqueInput
    create: XOR<VentaCreateWithoutDetallesInput, VentaUncheckedCreateWithoutDetallesInput>
  }

  export type ProductoCreateWithoutDetallesVentaInput = {
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    creadoEn?: Date | string
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutDetallesVentaInput = {
    id?: number
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    categoriaId: number
    creadoEn?: Date | string
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutDetallesVentaInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutDetallesVentaInput, ProductoUncheckedCreateWithoutDetallesVentaInput>
  }

  export type VentaUpsertWithoutDetallesInput = {
    update: XOR<VentaUpdateWithoutDetallesInput, VentaUncheckedUpdateWithoutDetallesInput>
    create: XOR<VentaCreateWithoutDetallesInput, VentaUncheckedCreateWithoutDetallesInput>
    where?: VentaWhereInput
  }

  export type VentaUpdateToOneWithWhereWithoutDetallesInput = {
    where?: VentaWhereInput
    data: XOR<VentaUpdateWithoutDetallesInput, VentaUncheckedUpdateWithoutDetallesInput>
  }

  export type VentaUpdateWithoutDetallesInput = {
    numero?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutVentasNestedInput
    cliente?: ClienteUpdateOneWithoutVentasNestedInput
  }

  export type VentaUncheckedUpdateWithoutDetallesInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    clienteId?: NullableIntFieldUpdateOperationsInput | number | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoUpsertWithoutDetallesVentaInput = {
    update: XOR<ProductoUpdateWithoutDetallesVentaInput, ProductoUncheckedUpdateWithoutDetallesVentaInput>
    create: XOR<ProductoCreateWithoutDetallesVentaInput, ProductoUncheckedCreateWithoutDetallesVentaInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutDetallesVentaInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutDetallesVentaInput, ProductoUncheckedUpdateWithoutDetallesVentaInput>
  }

  export type ProductoUpdateWithoutDetallesVentaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutDetallesVentaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoCreateWithoutEntradasMercaderiaInput = {
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    creadoEn?: Date | string
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    detallesVenta?: DetalleVentaCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutEntradasMercaderiaInput = {
    id?: number
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    categoriaId: number
    creadoEn?: Date | string
    detallesVenta?: DetalleVentaUncheckedCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutEntradasMercaderiaInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutEntradasMercaderiaInput, ProductoUncheckedCreateWithoutEntradasMercaderiaInput>
  }

  export type ProveedorCreateWithoutEntradasMercaderiaInput = {
    nombre: string
    ruc: string
    contacto: string
    activo?: boolean
    creadoEn?: Date | string
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutProveedorInput
  }

  export type ProveedorUncheckedCreateWithoutEntradasMercaderiaInput = {
    id?: number
    nombre: string
    ruc: string
    contacto: string
    activo?: boolean
    creadoEn?: Date | string
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutProveedorInput
  }

  export type ProveedorCreateOrConnectWithoutEntradasMercaderiaInput = {
    where: ProveedorWhereUniqueInput
    create: XOR<ProveedorCreateWithoutEntradasMercaderiaInput, ProveedorUncheckedCreateWithoutEntradasMercaderiaInput>
  }

  export type UsuarioCreateWithoutEntradasMercaderiaInput = {
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoCreateNestedManyWithoutUsuarioInput
    ventas?: VentaCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutEntradasMercaderiaInput = {
    id?: number
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoUncheckedCreateNestedManyWithoutUsuarioInput
    ventas?: VentaUncheckedCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutEntradasMercaderiaInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutEntradasMercaderiaInput, UsuarioUncheckedCreateWithoutEntradasMercaderiaInput>
  }

  export type ProductoUpsertWithoutEntradasMercaderiaInput = {
    update: XOR<ProductoUpdateWithoutEntradasMercaderiaInput, ProductoUncheckedUpdateWithoutEntradasMercaderiaInput>
    create: XOR<ProductoCreateWithoutEntradasMercaderiaInput, ProductoUncheckedCreateWithoutEntradasMercaderiaInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutEntradasMercaderiaInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutEntradasMercaderiaInput, ProductoUncheckedUpdateWithoutEntradasMercaderiaInput>
  }

  export type ProductoUpdateWithoutEntradasMercaderiaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    detallesVenta?: DetalleVentaUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutEntradasMercaderiaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detallesVenta?: DetalleVentaUncheckedUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProveedorUpsertWithoutEntradasMercaderiaInput = {
    update: XOR<ProveedorUpdateWithoutEntradasMercaderiaInput, ProveedorUncheckedUpdateWithoutEntradasMercaderiaInput>
    create: XOR<ProveedorCreateWithoutEntradasMercaderiaInput, ProveedorUncheckedCreateWithoutEntradasMercaderiaInput>
    where?: ProveedorWhereInput
  }

  export type ProveedorUpdateToOneWithWhereWithoutEntradasMercaderiaInput = {
    where?: ProveedorWhereInput
    data: XOR<ProveedorUpdateWithoutEntradasMercaderiaInput, ProveedorUncheckedUpdateWithoutEntradasMercaderiaInput>
  }

  export type ProveedorUpdateWithoutEntradasMercaderiaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    contacto?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    solicitudes?: SolicitudReposicionUpdateManyWithoutProveedorNestedInput
  }

  export type ProveedorUncheckedUpdateWithoutEntradasMercaderiaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    contacto?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutProveedorNestedInput
  }

  export type UsuarioUpsertWithoutEntradasMercaderiaInput = {
    update: XOR<UsuarioUpdateWithoutEntradasMercaderiaInput, UsuarioUncheckedUpdateWithoutEntradasMercaderiaInput>
    create: XOR<UsuarioCreateWithoutEntradasMercaderiaInput, UsuarioUncheckedCreateWithoutEntradasMercaderiaInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutEntradasMercaderiaInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutEntradasMercaderiaInput, UsuarioUncheckedUpdateWithoutEntradasMercaderiaInput>
  }

  export type UsuarioUpdateWithoutEntradasMercaderiaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUpdateManyWithoutUsuarioNestedInput
    ventas?: VentaUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutEntradasMercaderiaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUncheckedUpdateManyWithoutUsuarioNestedInput
    ventas?: VentaUncheckedUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type ProductoCreateWithoutBajasInput = {
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    creadoEn?: Date | string
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    detallesVenta?: DetalleVentaCreateNestedManyWithoutProductoInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutBajasInput = {
    id?: number
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    categoriaId: number
    creadoEn?: Date | string
    detallesVenta?: DetalleVentaUncheckedCreateNestedManyWithoutProductoInput
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutProductoInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutBajasInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutBajasInput, ProductoUncheckedCreateWithoutBajasInput>
  }

  export type UsuarioCreateWithoutBajasInput = {
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoCreateNestedManyWithoutUsuarioInput
    ventas?: VentaCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutBajasInput = {
    id?: number
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoUncheckedCreateNestedManyWithoutUsuarioInput
    ventas?: VentaUncheckedCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutUsuarioInput
    solicitudes?: SolicitudReposicionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutBajasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutBajasInput, UsuarioUncheckedCreateWithoutBajasInput>
  }

  export type ProductoUpsertWithoutBajasInput = {
    update: XOR<ProductoUpdateWithoutBajasInput, ProductoUncheckedUpdateWithoutBajasInput>
    create: XOR<ProductoCreateWithoutBajasInput, ProductoUncheckedCreateWithoutBajasInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutBajasInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutBajasInput, ProductoUncheckedUpdateWithoutBajasInput>
  }

  export type ProductoUpdateWithoutBajasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    detallesVenta?: DetalleVentaUpdateManyWithoutProductoNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutBajasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detallesVenta?: DetalleVentaUncheckedUpdateManyWithoutProductoNestedInput
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type UsuarioUpsertWithoutBajasInput = {
    update: XOR<UsuarioUpdateWithoutBajasInput, UsuarioUncheckedUpdateWithoutBajasInput>
    create: XOR<UsuarioCreateWithoutBajasInput, UsuarioUncheckedCreateWithoutBajasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutBajasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutBajasInput, UsuarioUncheckedUpdateWithoutBajasInput>
  }

  export type UsuarioUpdateWithoutBajasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUpdateManyWithoutUsuarioNestedInput
    ventas?: VentaUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutBajasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUncheckedUpdateManyWithoutUsuarioNestedInput
    ventas?: VentaUncheckedUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutUsuarioNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type ProductoCreateWithoutSolicitudesInput = {
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    creadoEn?: Date | string
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    detallesVenta?: DetalleVentaCreateNestedManyWithoutProductoInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutSolicitudesInput = {
    id?: number
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    categoriaId: number
    creadoEn?: Date | string
    detallesVenta?: DetalleVentaUncheckedCreateNestedManyWithoutProductoInput
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutProductoInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutSolicitudesInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutSolicitudesInput, ProductoUncheckedCreateWithoutSolicitudesInput>
  }

  export type UsuarioCreateWithoutSolicitudesInput = {
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoCreateNestedManyWithoutUsuarioInput
    ventas?: VentaCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutSolicitudesInput = {
    id?: number
    nombre: string
    email: string
    passwordHash: string
    rol: string
    activo?: boolean
    resetCode?: string | null
    resetExpiry?: Date | string | null
    creadoEn?: Date | string
    logAccesos?: LogAccesoUncheckedCreateNestedManyWithoutUsuarioInput
    ventas?: VentaUncheckedCreateNestedManyWithoutUsuarioInput
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutUsuarioInput
    bajas?: BajaInventarioUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutSolicitudesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutSolicitudesInput, UsuarioUncheckedCreateWithoutSolicitudesInput>
  }

  export type ProveedorCreateWithoutSolicitudesInput = {
    nombre: string
    ruc: string
    contacto: string
    activo?: boolean
    creadoEn?: Date | string
    entradasMercaderia?: EntradaMercaderiaCreateNestedManyWithoutProveedorInput
  }

  export type ProveedorUncheckedCreateWithoutSolicitudesInput = {
    id?: number
    nombre: string
    ruc: string
    contacto: string
    activo?: boolean
    creadoEn?: Date | string
    entradasMercaderia?: EntradaMercaderiaUncheckedCreateNestedManyWithoutProveedorInput
  }

  export type ProveedorCreateOrConnectWithoutSolicitudesInput = {
    where: ProveedorWhereUniqueInput
    create: XOR<ProveedorCreateWithoutSolicitudesInput, ProveedorUncheckedCreateWithoutSolicitudesInput>
  }

  export type ProductoUpsertWithoutSolicitudesInput = {
    update: XOR<ProductoUpdateWithoutSolicitudesInput, ProductoUncheckedUpdateWithoutSolicitudesInput>
    create: XOR<ProductoCreateWithoutSolicitudesInput, ProductoUncheckedCreateWithoutSolicitudesInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutSolicitudesInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutSolicitudesInput, ProductoUncheckedUpdateWithoutSolicitudesInput>
  }

  export type ProductoUpdateWithoutSolicitudesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    detallesVenta?: DetalleVentaUpdateManyWithoutProductoNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutSolicitudesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    categoriaId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detallesVenta?: DetalleVentaUncheckedUpdateManyWithoutProductoNestedInput
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type UsuarioUpsertWithoutSolicitudesInput = {
    update: XOR<UsuarioUpdateWithoutSolicitudesInput, UsuarioUncheckedUpdateWithoutSolicitudesInput>
    create: XOR<UsuarioCreateWithoutSolicitudesInput, UsuarioUncheckedCreateWithoutSolicitudesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutSolicitudesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutSolicitudesInput, UsuarioUncheckedUpdateWithoutSolicitudesInput>
  }

  export type UsuarioUpdateWithoutSolicitudesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUpdateManyWithoutUsuarioNestedInput
    ventas?: VentaUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutSolicitudesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    logAccesos?: LogAccesoUncheckedUpdateManyWithoutUsuarioNestedInput
    ventas?: VentaUncheckedUpdateManyWithoutUsuarioNestedInput
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutUsuarioNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type ProveedorUpsertWithoutSolicitudesInput = {
    update: XOR<ProveedorUpdateWithoutSolicitudesInput, ProveedorUncheckedUpdateWithoutSolicitudesInput>
    create: XOR<ProveedorCreateWithoutSolicitudesInput, ProveedorUncheckedCreateWithoutSolicitudesInput>
    where?: ProveedorWhereInput
  }

  export type ProveedorUpdateToOneWithWhereWithoutSolicitudesInput = {
    where?: ProveedorWhereInput
    data: XOR<ProveedorUpdateWithoutSolicitudesInput, ProveedorUncheckedUpdateWithoutSolicitudesInput>
  }

  export type ProveedorUpdateWithoutSolicitudesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    contacto?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutProveedorNestedInput
  }

  export type ProveedorUncheckedUpdateWithoutSolicitudesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    contacto?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutProveedorNestedInput
  }

  export type LogAccesoCreateManyUsuarioInput = {
    id?: number
    rol: string
    timestamp?: Date | string
    archivado?: boolean
  }

  export type VentaCreateManyUsuarioInput = {
    id?: number
    numero: string
    clienteId?: number | null
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
  }

  export type EntradaMercaderiaCreateManyUsuarioInput = {
    id?: number
    productoId: number
    proveedorId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    creadoEn?: Date | string
  }

  export type BajaInventarioCreateManyUsuarioInput = {
    id?: number
    productoId: number
    cantidad: number
    motivo: string
    creadoEn?: Date | string
  }

  export type SolicitudReposicionCreateManyUsuarioInput = {
    id?: number
    productoId: number
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    proveedorId?: number | null
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
  }

  export type LogAccesoUpdateWithoutUsuarioInput = {
    rol?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    archivado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LogAccesoUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    rol?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    archivado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LogAccesoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    rol?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    archivado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VentaUpdateWithoutUsuarioInput = {
    numero?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleVentaUpdateManyWithoutVentaNestedInput
    cliente?: ClienteUpdateOneWithoutVentasNestedInput
  }

  export type VentaUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableIntFieldUpdateOperationsInput | number | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleVentaUncheckedUpdateManyWithoutVentaNestedInput
  }

  export type VentaUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableIntFieldUpdateOperationsInput | number | null
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntradaMercaderiaUpdateWithoutUsuarioInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutEntradasMercaderiaNestedInput
    proveedor?: ProveedorUpdateOneRequiredWithoutEntradasMercaderiaNestedInput
  }

  export type EntradaMercaderiaUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    proveedorId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntradaMercaderiaUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    proveedorId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BajaInventarioUpdateWithoutUsuarioInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutBajasNestedInput
  }

  export type BajaInventarioUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BajaInventarioUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudReposicionUpdateWithoutUsuarioInput = {
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutSolicitudesNestedInput
    proveedor?: ProveedorUpdateOneWithoutSolicitudesNestedInput
  }

  export type SolicitudReposicionUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    proveedorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudReposicionUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    proveedorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoCreateManyCategoriaInput = {
    id?: number
    nombre: string
    marca: string
    precio: Decimal | DecimalJsLike | number | string
    stock?: number
    fechaVencimiento?: Date | string | null
    activo?: boolean
    creadoEn?: Date | string
  }

  export type ProductoUpdateWithoutCategoriaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detallesVenta?: DetalleVentaUpdateManyWithoutProductoNestedInput
    entradasMercaderia?: EntradaMercaderiaUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutCategoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detallesVenta?: DetalleVentaUncheckedUpdateManyWithoutProductoNestedInput
    entradasMercaderia?: EntradaMercaderiaUncheckedUpdateManyWithoutProductoNestedInput
    bajas?: BajaInventarioUncheckedUpdateManyWithoutProductoNestedInput
    solicitudes?: SolicitudReposicionUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateManyWithoutCategoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    fechaVencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DetalleVentaCreateManyProductoInput = {
    id?: number
    ventaId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type EntradaMercaderiaCreateManyProductoInput = {
    id?: number
    proveedorId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type BajaInventarioCreateManyProductoInput = {
    id?: number
    cantidad: number
    motivo: string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type SolicitudReposicionCreateManyProductoInput = {
    id?: number
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    usuarioId: number
    proveedorId?: number | null
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
  }

  export type DetalleVentaUpdateWithoutProductoInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    venta?: VentaUpdateOneRequiredWithoutDetallesNestedInput
  }

  export type DetalleVentaUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    ventaId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DetalleVentaUncheckedUpdateManyWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    ventaId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type EntradaMercaderiaUpdateWithoutProductoInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    proveedor?: ProveedorUpdateOneRequiredWithoutEntradasMercaderiaNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutEntradasMercaderiaNestedInput
  }

  export type EntradaMercaderiaUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    proveedorId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntradaMercaderiaUncheckedUpdateManyWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    proveedorId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BajaInventarioUpdateWithoutProductoInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutBajasNestedInput
  }

  export type BajaInventarioUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BajaInventarioUncheckedUpdateManyWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    motivo?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudReposicionUpdateWithoutProductoInput = {
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutSolicitudesNestedInput
    proveedor?: ProveedorUpdateOneWithoutSolicitudesNestedInput
  }

  export type SolicitudReposicionUncheckedUpdateWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    proveedorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudReposicionUncheckedUpdateManyWithoutProductoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    proveedorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntradaMercaderiaCreateManyProveedorInput = {
    id?: number
    productoId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    usuarioId: number
    creadoEn?: Date | string
  }

  export type SolicitudReposicionCreateManyProveedorInput = {
    id?: number
    productoId: number
    cantidadActual: number
    cantidadSolicitada: number
    estado?: string
    usuarioId: number
    fechaEstimada?: Date | string | null
    notaRechazo?: string | null
    creadoEn?: Date | string
  }

  export type EntradaMercaderiaUpdateWithoutProveedorInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutEntradasMercaderiaNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutEntradasMercaderiaNestedInput
  }

  export type EntradaMercaderiaUncheckedUpdateWithoutProveedorInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntradaMercaderiaUncheckedUpdateManyWithoutProveedorInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudReposicionUpdateWithoutProveedorInput = {
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutSolicitudesNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutSolicitudesNestedInput
  }

  export type SolicitudReposicionUncheckedUpdateWithoutProveedorInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudReposicionUncheckedUpdateManyWithoutProveedorInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidadActual?: IntFieldUpdateOperationsInput | number
    cantidadSolicitada?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    fechaEstimada?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notaRechazo?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VentaCreateManyClienteInput = {
    id?: number
    numero: string
    usuarioId: number
    subtotal: Decimal | DecimalJsLike | number | string
    igv: Decimal | DecimalJsLike | number | string
    total: Decimal | DecimalJsLike | number | string
    metodoPago: string
    montoRecibido?: Decimal | DecimalJsLike | number | string
    vuelto?: Decimal | DecimalJsLike | number | string
    estado?: string
    creadoEn?: Date | string
  }

  export type VentaUpdateWithoutClienteInput = {
    numero?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleVentaUpdateManyWithoutVentaNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutVentasNestedInput
  }

  export type VentaUncheckedUpdateWithoutClienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
    detalles?: DetalleVentaUncheckedUpdateManyWithoutVentaNestedInput
  }

  export type VentaUncheckedUpdateManyWithoutClienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    usuarioId?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    igv?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    total?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    metodoPago?: StringFieldUpdateOperationsInput | string
    montoRecibido?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vuelto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DetalleVentaCreateManyVentaInput = {
    id?: number
    productoId: number
    cantidad: number
    precioUnitario: Decimal | DecimalJsLike | number | string
    subtotal: Decimal | DecimalJsLike | number | string
  }

  export type DetalleVentaUpdateWithoutVentaInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    producto?: ProductoUpdateOneRequiredWithoutDetallesVentaNestedInput
  }

  export type DetalleVentaUncheckedUpdateWithoutVentaInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DetalleVentaUncheckedUpdateManyWithoutVentaInput = {
    id?: IntFieldUpdateOperationsInput | number
    productoId?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}