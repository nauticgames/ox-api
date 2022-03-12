const BuildStadiumMetadata = (id, type) => {
  const names = ["Moon", "Mars", "Chaos"];

  id = parseInt(id);
  type = parseInt(type);

  const name = names[type];

  return {
    itemId: id,
    name: `${name} Stadium #${id}`,
    description: "OX Soccer Stadiums",
    external_url: "https://marketplace.oxsoccer.com/",
    image: `https://ox-images.s3.amazonaws.com/${name}.png`,
    attributes: [
      {
        trait_type: "Stadium Type",
        value: name,
      },
    ],
  };
};

export { BuildStadiumMetadata };
