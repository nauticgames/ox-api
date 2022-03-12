const ResponseHandler = {
  Unauthorized: {
    code: 401,
    message: "Unauthorized",
  },
  AssetNotFound: {
    code: 404,
    message: "Asset not found",
  },
  NetworkError: {
    code: 500,
    message: "Network error",
  },
  NothingToResync: {
    code: 200,
    message: "No assets to resync",
  },
  AssetsSynced: {
    code: 200,
    message: "Assets synced succesfully",
  },
};

export default ResponseHandler;
