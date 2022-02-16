const { stadiumNames } = require("../src/utils/stadiumTypes");

module.exports = function (stadiumId, stadiumType) {
  const id = parseInt(stadiumId);
  const type = parseInt(stadiumType);
  const stadiumName = stadiumNames[type];

  const metadata = {
    itemId: id,
    name: `${stadiumName} Stadium #${id}`,
    description: "OX Soccer Stadiums",
    external_url: "https://marketplace.oxsoccer.com/",
    image: `https://marketplace.oxsoccer.com/assets/img/${stadiumName.toLowerCase()}.png`,
    attributes: [
      {
        trait_type: "Stadium Type",
        value: stadiumName,
      },
    ],
  };

  return metadata;
};
