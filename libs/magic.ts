import { Magic } from "magic-sdk"

const createMagic = () => {
  // 
  return typeof window != 'undefined' && new Magic(`${process.env.NEXT_PUBLIC_MAGIC_API_KEY}`, {
    network: {
      rpcUrl: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
    },
  })
};

export const magic = createMagic();
