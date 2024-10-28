import 'server-only';

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import { app } from 'firebase';

export const firestore = getFirestore(app);


export async function getProducts(
  search: string,
  offset: number
) { //: Promise<{
//   products: JSON[];
//   newOffset: number | null;
//   totalProducts: number;
// }> {

  // Always search the full table, not per page
  // if (search) {
  //   return {
  //     products: await db
  //       .select()
  //       .from(products)
  //       .where(ilike(products.name, `%${search}%`))
  //       .limit(1000),
  //     newOffset: null,
  //     totalProducts: 0
  //   };
  // }

  // if (offset === null) {
  //   return { products: [], newOffset: null, totalProducts: 0 };
  // }

  // let totalProducts = await db.select({ count: count() }).from(products);
  // let moreProducts = await db.select().from(products).limit(5).offset(offset);
  // let newOffset = moreProducts.length >= 5 ? offset + 5 : null;
  const snapshot = await getDocs(collection(firestore, 'products'));
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });

  // return {
  //   products: moreProducts,
  //   newOffset,
  //   totalProducts: totalProducts[0].count
  // };
}

// export async function deleteProductById(id: number) {
//   await db.delete(products).where(eq(products.id, id));
// }
