# HijriCalendar
## Output Hijri current date

- Functions: **gomod** and **calendar** converts Gregorian calendar to hijri calendar.
- Function: **writeIslamicDate** outputs current date in the following format:
> الأحَد, 6 جُمَادَىٰ ٱلْأُولَىٰ 1442 الموافق ل 20-12-2020

## Output Prayer Times

-This is basically API ajax call for one or more APIs, the following were used in this example:

 1. http://muslimsalat.com/doha/daily.json?key=API_KEY&jsoncallback=?
 2. https://muezzin-staging.herokuapp.com/prayerTimes/country/xx/city/xxx/district/xxx
 
 ## Note
 - Check the API documentations for the correct country, time zone...
 - Multiple API calls in case of a failure for a particular call 
