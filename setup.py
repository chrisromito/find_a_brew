from setuptools import find_packages, setup

setup(
    name='find_a_brew',
    # packages=['find_a_brew'],
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)