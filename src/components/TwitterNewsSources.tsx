import { ExternalLink } from 'lucide-react';

const twitterSources = [
  { handle: '@BleepinComputer', description: 'Real-time data breach alerts and ransomware coverage.', url: 'https://twitter.com/BleepinComputer' },
  { handle: '@haveibeenpwned', description: 'Official feed for HaveIBeenPwned, announcing new breach discoveries.', url: 'https://twitter.com/haveibeenpwned' },
  { handle: '@TheHackersNews', description: 'Major cybersecurity, hacking, and breach headlines.', url: 'https://twitter.com/TheHackersNews' },
  { handle: '@vxunderground', description: 'Covers ransomware and breach gang developments.', url: 'https://twitter.com/vxunderground' },
  { handle: '@CyberSecurityN8', description: 'Aggregates data breach, malware, and zero-day alerts.', url: 'https://twitter.com/CyberSecurityN8' },
  { handle: '@securityaffairs', description: 'Alerts on global infosec and breach incidents.', url: 'https://twitter.com/securityaffairs' },
  { handle: '@DataBreachesNet', description: 'Investigative reporting and breach incident summaries.', url: 'https://twitter.com/DataBreachesNet' },
];

const TwitterNewsSources = () => {
  return (
    <div className="mt-12 bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="font-semibold font-heading text-navy-900 mb-4">Curated X/Twitter Feeds</h3>
      <p className="text-sm text-slate-600 mb-6 font-body">
        For up-to-the-minute alerts, we recommend following these trusted cybersecurity experts on X/Twitter.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {twitterSources.map((source) => (
          <a
            key={source.handle}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium font-heading text-navy-900 text-sm group-hover:text-primary-600">{source.handle}</h4>
              <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-primary-600" />
            </div>
            <p className="text-xs text-slate-600 font-body">{source.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TwitterNewsSources;