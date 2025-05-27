import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

data=pd.read_csv('../Downloads/NUMBERS3_ALL.csv')

for col in data.columns:
    data[col].value_counts().sort_index.plot(kind='bar',title=f"Digit Distribution in {col}")
    plt.show()