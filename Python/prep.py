import datetime
import random

def print_dates(dates):
    print "dates:"
    for d in dates:
        print str(d)

def print_gaps(gaps):
    print "gaps:"
    for g in gaps:
        print str(g[0]), str(g[1]), g[1]-g[0]

def generate_random_dates(skip_p, max_length):
    dates = []
    for d in xrange(max_length):
        if random.random() > skip_p:
            dates.append(datetime.date(2016,1,1)+datetime.timedelta(days=d))
    return dates

def find_biggest_gap(dates):
    gaps = []
    last_date = None
    for curr_date in dates:
        if last_date and curr_date - last_date > datetime.timedelta(days=1):
            gaps.append((last_date, curr_date))
        last_date = curr_date
    gaps = sorted(gaps, key=lambda x: x[1]-x[0])
    print_gaps(gaps)
    return gaps[-1] if len(gaps) > 0 else None

dates = generate_random_dates(0.5, 20)
print_dates(dates)
biggest_gap = find_biggest_gap(dates)
print "biggest gap: ",  str(biggest_gap[0]), str(biggest_gap[1])
