import streamlit as st
import numpy as np
import matplotlib.pyplot as plt

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(np.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

def find_primes_up_to(n):
    return [num for num in range(2, n+1) if is_prime(num)]

def main():
    st.set_page_config(
        page_title="소수 계산기",
        page_icon="🔢",
        layout="wide"
    )

    st.title("🔢 소수(Prime Number) 계산기")
    st.write("소수를 찾고 분석하는 수학 도구입니다.")

    # 사이드바 입력
    with st.sidebar:
        st.header("설정")
        max_number = st.number_input(
            "계산할 최대 숫자를 입력하세요",
            min_value=2,
            max_value=1000,
            value=100
        )

    # 메인 컨텐츠
    col1, col2 = st.columns(2)

    with col1:
        st.subheader("소수 목록")
        primes = find_primes_up_to(max_number)
        st.write(primes)
        st.write(f"1부터 {max_number}까지의 소수 개수: {len(primes)}개")

    with col2:
        st.subheader("소수 분포 그래프")
        fig, ax = plt.subplots(figsize=(10, 6))
        ax.hist(primes, bins=20, color='blue', alpha=0.7)
        ax.set_title(f'소수 분포 (1-{max_number})')
        ax.set_xlabel('숫자')
        ax.set_ylabel('빈도')
        st.pyplot(fig)

    # 소수 판별기
    st.subheader("소수 판별기")
    number_to_check = st.number_input(
        "숫자를 입력하세요",
        min_value=1,
        max_value=10000,
        value=17
    )
    
    if st.button("판별하기"):
        if is_prime(number_to_check):
            st.success(f"{number_to_check}는 소수입니다! ✨")
        else:
            st.error(f"{number_to_check}는 소수가 아닙니다.")

if __name__ == "__main__":
    main()
