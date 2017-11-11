import csv

def cal_return(prev_day_price, curr_day_price):
    return (((curr_day_price - prev_day_price)/prev_day_price) * 100)


with open('Desktop/yahoo_hist_prices.csv') as csvfile:
    lqd_reader = csv.reader(csvfile)
    headers = next(lqd_reader)
    headers.append("Return")
    headers.append("Cumulative Interest")
    
    lqd_list = list(lqd_reader)
    
    price_ind = 1
    return_ind = 3

    start_ind = 0
    for i,r in enumerate(lqd_list):
        if r[0] == "2013-12-31":
            start_ind = i
            break
        lqd_list[i].append(0)
        lqd_list[i].append(0)
            
    lqd_list[start_ind].append(0)
    lqd_list[start_ind].append(100)
    for i in range(start_ind+1,len(lqd_list)):
        prev_day_price = float(lqd_list[i-1][price_ind])
        curr_day_price = float(lqd_list[i][price_ind])
        curr_return = cal_return(prev_day_price, curr_day_price)
        curr_cumul_interest = lqd_list[i-1][return_ind]*(1+curr_return/100)
        
        lqd_list[i].append(curr_return)
        lqd_list[i].append(curr_cumul_interest)

    with open('Desktop/yahoo_hist_lqd.csv', 'wb') as writefile:
        csvwriter = csv.writer(writefile)
        csvwriter.writerow(headers)
        csvwriter.writerow(lqd_list[start_ind])
        for r in lqd_list[start_ind+1:]:
            period_ind = str(r[2]).index('.')
            r[2] = str(r[2])[:period_ind+3] + "%"
            period_ind = str(r[3]).index('.')
            r[3] = str(r[3])[:period_ind+3] + "%" 
            csvwriter.writerow(r)
        
