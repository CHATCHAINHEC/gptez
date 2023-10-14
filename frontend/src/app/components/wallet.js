const string path = "wallet-beacon-sample.db";

var factory = new WalletBeaconClientFactory();

var options = new BeaconOptions
{
    AppName = "Wallet sample",
    AppUrl = "https://awesome-wallet.io",
    IconUrl = "https://services.tzkt.io/v1/avatars/KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5",
    KnownRelayServers = Constants.KnownRelayServers,

    // for some operating systems compability reasons we should use Mode=Exclusive for LiteDB.
    DatabaseConnectionString = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
        ? $"Filename={path}; Connection=Shared;"
        : $"Filename={path}; Mode=Exclusive;"
};

// creating test logger, you can provide your own app-context logger here.
Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .CreateLogger();

ILoggerProvider loggerProvider = new SerilogLoggerProvider(Logger);

IWalletBeaconClient beaconWalletClient = BeaconClientFactory.Create<IWalletBeaconClient>(options, loggerProvider);