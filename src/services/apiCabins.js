import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  //receives data with supabase on it, to check if theres path already
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //creates unique name for image and replace all '/' with ''
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //creates image path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://nruobkekgbifyuwmkggz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-02-13T22%3A23%3A23.363Z

  //1. create/edit cabin

  let query = supabase.from("cabins");

  //1.A create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //1.B Edit cabin and checks if there image
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete cabin if error on upload image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Image could not be uploaded. Cabin was not created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
