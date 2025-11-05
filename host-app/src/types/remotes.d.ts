/// <reference types="react" />

/**
 * Module Federation Remote Type Declarations
 * These declarations provide TypeScript support for dynamically loaded remote modules
 */

declare module 'reactMfeModule/ProductList' {
  const ProductList: React.ComponentType;
  export default ProductList;
}

declare module 'reactMfeModule/UserProfile' {
  const UserProfile: React.ComponentType;
  export default UserProfile;
}

declare module 'reactMfeModule/ReactMFE' {
  const ReactMFE: React.ComponentType;
  export default ReactMFE;
}










